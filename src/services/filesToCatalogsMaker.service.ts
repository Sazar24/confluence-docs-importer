import * as fs from "fs-extra";

export default class FilesToCatalogsConverter {
    private fileList: fs.Dirent[];
    private sourcePath: string;
    private sourceFilesAmmount: number;

    constructor() { }

    buildCatalogsTree(sourcePath: string, outputPath: string) {
        this.showStartMessage();
        this.confirmSourceFolderExistenceOrCrush(sourcePath);
        this.getFilesList();
        this.ConvertEachFileToConfluencePage(outputPath);
    }

    private showStartMessage(): void {
        console.log("\n============\nTree building process has started.")
    }

    private confirmSourceFolderExistenceOrCrush(path: string): void {
        const isCatalogExist: boolean = fs.existsSync(path);
        if (!isCatalogExist) throw new Error("Given catalog does not exist!\n+++ Path: " + path);
        else this.saveSourcePath(path);
    }

    private saveSourcePath(path: string) {
        this.sourcePath = path;
    }

    private getFilesList(): void {
        const filesAndCatalogs: fs.Dirent[] = fs.readdirSync(this.sourcePath, { withFileTypes: true });
        let filesOnly: fs.Dirent[] = filesAndCatalogs.filter(item => item.isFile());

        this.sourceFilesAmmount = filesOnly.length;
        this.fileList = filesOnly;
    }


    private ConvertEachFileToConfluencePage(outputPath: string) {
        this.fileList.forEach((file, index) => {
            console.log("convert started for (index): " + index);
            const newFolderFullPath = this.computeNewFolderFullPath(file.name, outputPath);
            const isCatalogCreated: boolean = this.createFolder_ConflVersion(newFolderFullPath);
            if (isCatalogCreated) {
                this.copyFileToThatFolder(file, newFolderFullPath);
                this.createPageContentFile(file.name, newFolderFullPath, index);
            }
            console.log("convert end for (index): " + index + "\n");
        });
    }


    private computeNewFolderFullPath(name: string, path: string): string {
        this.checkPathCorrectness(path);
        const fullPath: string = path + name; 
        return fullPath;
    }


    private createFolder_ConflVersion(destinationPath: string): boolean {
        if (this.isAlreadyExist(destinationPath)) {
            return false
        }
        else {
            return this.tryCreateFolder(destinationPath); 
        }
    }

    private tryCreateFolder(path: string) {
        try {
            fs.mkdirSync(path);
            return true;
        } catch (err) {
            throw err;
        }
    }

    private isAlreadyExist(fullPath: string): boolean {
        const isCatalogExist: boolean = fs.existsSync(fullPath);
        return isCatalogExist;
    }

    private checkPathCorrectness(path: string) {
        const hasSlashAtEnd: boolean = path[path.length - 1] === "/";
        if (!hasSlashAtEnd)
            throw new Error("Path is incorrect! Should have slash ('/') at end of given path");
    }

    private async copyFileToThatFolder(file: fs.Dirent, destinationCatalog: string): Promise<void> {
        const fileName: string = file.name;
        const sourceFileFullPath: string = this.sourcePath + fileName;
        const destinationFileFullPath: string = destinationCatalog + "/" + fileName;

        try {
            fs.copyFileSync(sourceFileFullPath, destinationFileFullPath);
        } catch (err) {
            throw err;
        }
    }

    private createPageContentFile(fileName: string, destinationCatalog: string, index: number = 0) {
        const confluencePageFileExtension = ".txt";
        const destinationFileFullPath: string = destinationCatalog + "/" + fileName + confluencePageFileExtension;

        const macroID_uniquePerPage = "12e08ee5-6db6-412a-8cb3-aebfd1cc5fb7"; // macro ID is not obligatory element, but may be usefull in future (Its kind of handler for some api actions. Propably.)
        const fileContent = `<p><ac:structured-macro ac:name="viewdoc" ac:schema-version="1" ac:macro-id="${macroID_uniquePerPage}"><ac:parameter ac:name="name"><ri:attachment ri:filename="${fileName}" /></ac:parameter></ac:structured-macro></p>`;

        try {
            fs.writeFileSync(destinationFileFullPath, fileContent);
        } catch (err) {
            throw err;
        }

        console.log(`Progress: ${index} of ${this.sourceFilesAmmount} | Created: "${fileName + confluencePageFileExtension}"`);
        this.checkSavedFile(destinationFileFullPath, fileContent);
    }


    private async checkSavedFile(filePathWithName: string, expectedContent: string) {
        const filePath: string = filePathWithName; 
        fs.readFileSync(filePath, 'utf-8');
    }
}
