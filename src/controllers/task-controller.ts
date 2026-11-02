import { Request, Response } from "express";
import { Task } from "../types/task";

const dataTask: Task[] = [
    {
        id: 1,
        title: "Belajar TypeScript",
        description: "Mempelajari basic type dan interface",
        status: "completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Buat REST API",
        description: "Membuat API menggunakan Express.js",
        status: "pending",
        createdAt: new Date().toISOString()
    },
];

export class TaskController {
    getTasks = async (req: Request, res: Response) => {
        res.status(200).json({
            status: "true",
            message: "Data task berhasil diambil",
            data: {
                tasks: dataTask,
            },
        });
    };

    getTaskById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const task = dataTask.find((task) => task.id === id);

        if (!Number.isInteger(id) || !task) {
            return res.status(404).json({
                status: "false",
                message: "Task tidak ditemukan",
            });
        }

        return res.status(200).json({
            status: "true",
            message: "Detail task berhasil diambil",
            data: {
                task,
            },
        });
    };

    createTask = async (req: Request, res: Response) => {
        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                status: "false",
                message: "Title dan description wajib diisi",
            });
        }

        const taskStatus = status || "pending";
        if (taskStatus !== "pending" && taskStatus !== "completed") {
            return res.status(400).json({
                status: "false",
                message: "Status hanya boleh 'pending' atau 'completed'",
            });
        }

        const newId = dataTask.length > 0 ? Math.max(...dataTask.map((task) => task.id)) + 1 : 1;

        const newTask: Task = {
            id: newId,
            title,
            description,
            status: taskStatus,
            createdAt: new Date().toISOString(),
        };

        dataTask.push(newTask);

        return res.status(201).json({
            status: "true",
            message: "Create task success",
            data: {
                task: newTask,
            },
        });
    };

    updateTask = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const { title, description, status } = req.body;

        const task = dataTask.find((task) => task.id === id);

        if (!Number.isInteger(id) || !task) {
            return res.status(404).json({
                status: "false",
                message: "Task tidak ditemukan",
            });
        }

        if (!title || !description) {
            return res.status(400).json({
                status: "false",
                message: "Title dan description wajib diisi",
            });
        }

        if (status && status !== "pending" && status !== "completed") {
            return res.status(400).json({
                status: "false",
                message: "Status hanya boleh 'pending' atau 'completed'",
            });
        }

        task.title = title;
        task.description = description;
        if (status) task.status = status;

        return res.status(200).json({
            status: "true",
            message: "Update task success",
            data: {
                task,
            },
        });
    };

    deleteTask = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const index = dataTask.findIndex((task) => task.id === id);

        if (!Number.isInteger(id) || index === -1) {
            return res.status(404).json({
                status: "false",
                message: "Task tidak ditemukan",
            });
        }

        const deletedTask = dataTask.splice(index, 1)[0];

        return res.status(200).json({
            status: "true",
            message: "Delete Task Success",
            data: {
                task: deletedTask,
            },
        });
    };
}

export default new TaskController();