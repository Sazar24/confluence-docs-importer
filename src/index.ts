import ConfluenceDocsAdapter from "./services/confluenceDocsAdapter.service";

const confluenceDocsAdapter = new ConfluenceDocsAdapter();

// paths below must have ending slash:
const INPUT_FILES_PATH: string = "./input-files/"; 
const OUTPUT_PATH: string = "./output/";


confluenceDocsAdapter.eachFileToSeparatePageConverter.
    buildCatalogsTree(INPUT_FILES_PATH, OUTPUT_PATH); 