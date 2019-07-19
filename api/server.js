const express = require("express");

const ProjectRouter = require("../project-tracker/projects/project-router");
const ActionRouter = require("../project-tracker/actions/action-router");

const server = express();

server.use(express.json());

server.use("/api/projects", ProjectRouter);
server.use("/api/actions", ActionRouter);

module.exports = server;
