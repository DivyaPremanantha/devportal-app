import chokidar from "chokidar";
import fs from "fs-extra";
import path from "path";

const source = process.cwd() + "/../../src"
const destination = "./public/resources"
const mockDirSource = process.cwd() + "/../../mock"
const mocDirDestination = "./public/resources/mock"

// Check if --watch flag is present in the command line arguments
const watch = process.argv.includes("--watch")

// Copy files on startup
if (fs.existsSync(source)) {
  fs.copySync(source, destination, { recursive: true })
  fs.copySync(mockDirSource, mocDirDestination, { recursive: true })
}

// Watch for changes if --watch flag is present

// if (watch) {
  const watcher = chokidar.watch(source, {
    persistent: true,
    usePolling: true,
  })

  const mockDirWatcher = chokidar.watch(mockDirSource, {
    persistent: true,
    usePolling: true,
  })

  // Watch for all events in source folder
  watcher.on("all", (event, filePath) => {
    const relativePath = path.relative(source, filePath)
    const destinationPath = path.join(destination, relativePath)
    if (event === "unlink") {
      fs.removeSync(destinationPath)
    } else {
      fs.copySync(filePath, destinationPath)
    }
  })

  mockDirWatcher.on("all", (event, filePath) => {
    const relativePath = path.relative(source, filePath)
    const destinationPath = path.join(mocDirDestination, relativePath)
    if (event === "unlink") {
      fs.removeSync(destinationPath)
    } else {
      fs.copySync(filePath, destinationPath)
    }
  })
