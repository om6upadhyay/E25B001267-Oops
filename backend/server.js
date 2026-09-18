


const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ====================
// MongoDB Connection
// ====================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });

// ====================
// File Schema
// ====================

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },

    node: {
        type: String,
        required: true
    },

    size: {
        type: Number,
        required: true
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model("File", fileSchema);

// ====================
// Multer Configuration
// ====================

const upload = multer({
    dest: "uploads/"
});

// ====================
// Storage Nodes
// ====================

const nodes = [
    path.join(__dirname, "..", "storage", "node1"),
    path.join(__dirname, "..", "storage", "node2"),
    path.join(__dirname, "..", "storage", "node3")
];

nodes.forEach((node) => {
    if (!fs.existsSync(node)) {
        fs.mkdirSync(node, {
            recursive: true
        });
    }
});

// ====================
// Round Robin
// ====================

let currentNode = 0;

// ====================
// Home Route
// ====================

app.get("/", (req, res) => {
    res.send("Distributed File System Backend is Running!");
});

// ====================
// Upload File
// ====================

app.post("/upload", upload.single("file"), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    try {

        const sourcePath = req.file.path;

        const selectedNode = nodes[currentNode];

        const destinationPath = path.join(
            selectedNode,
            req.file.originalname
        );

        fs.renameSync(
            sourcePath,
            destinationPath
        );

        const nodeName = `node${currentNode + 1}`;

        const newFile = new File({
            filename: req.file.originalname,
            node: nodeName,
            size: req.file.size
        });

        await newFile.save();

        currentNode =
            (currentNode + 1) % nodes.length;

        res.json({
            success: true,
            message: "File distributed successfully",
            originalName: req.file.originalname,
            storedIn: nodeName,
            size: req.file.size
        });

    } catch (error) {

        console.error("Upload Error:", error);

        res.status(500).json({
            success: false,
            message: "File upload failed"
        });
    }
});

// ====================
// Get All Files
// ====================

app.get("/files", async (req, res) => {

    try {

        const files = await File.find()
            .sort({
                uploadedAt: -1
            });

        res.json(files);

    } catch (error) {

        console.error("File List Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch files"
        });
    }
});

// ====================
// Search Files
// ====================

app.get("/files/search", async (req, res) => {

    try {

        const search = req.query.name || "";

        const files = await File.find({
            filename: {
                $regex: search,
                $options: "i"
            }
        }).sort({
            uploadedAt: -1
        });

        res.json(files);

    } catch (error) {

        console.error("Search Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to search files"
        });
    }
});

// ====================
// Download File
// ====================

app.get(
    "/download/:node/:filename",
    (req, res) => {

        const {
            node,
            filename
        } = req.params;

        const nodePath = path.join(
            __dirname,
            "..",
            "storage",
            node
        );

        const filePath = path.join(
            nodePath,
            filename
        );

        if (!fs.existsSync(filePath)) {

            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        res.download(
            filePath,
            filename
        );
    }
);

// ====================
// Delete File
// ====================

app.delete("/files/:id", async (req, res) => {

    console.log(
        "DELETE REQUEST RECEIVED:",
        req.params.id
    );

    try {

        const file = await File.findById(
            req.params.id
        );

        if (!file) {

            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        // Physical file path

        const filePath = path.join(
            __dirname,
            "..",
            "storage",
            file.node,
            file.filename
        );

        // Delete physical file

        if (fs.existsSync(filePath)) {

            fs.unlinkSync(filePath);

            console.log(
                "Physical file deleted:",
                file.filename
            );
        }

        // Delete MongoDB record

        await File.findByIdAndDelete(
            req.params.id
        );

        console.log(
            "MongoDB record deleted:",
            req.params.id
        );

        res.json({
            success: true,
            message: "File deleted successfully"
        });

    } catch (error) {

        console.error(
            "Delete Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "File deletion failed"
        });
    }
});

// ====================
// Start Server
// ====================

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});