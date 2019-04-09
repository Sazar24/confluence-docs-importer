# objective
1. Move hundreds of old documentation files (kept in .docx) to Confluence space.
2. Those files content must be displayed on confluence pages directly - not via attachments-link.

# How to accomplish it
This app takes all the files you want import to Confluence and convert it to confluence-proper (compatible) catalogs-structure.
All you need to do later is to move that catalog to Confluence via webDAV (which for 
me takes something around 5-20 secondss per original file) and the work is done.
  
In new pages created this way, The script adds view-word-macro, which displays attached word file directly - in the page via browser. (This macro lets you to edit attached file directly in microsoft-word as well)

Described solution doesn`t touch the issue of deciding for every single page if it should be imported as one or many-self-nested pages. Every file is imported as one. 
Script can be easily adjusted for handling files with duplicated file/page-name, as well.

# Origins and Confluence community link
- I was not the only one, who encountered the lack of such build-in feature:  
https://community.atlassian.com/t5/Confluence-questions/Bulk-import-Word-documents-as-confluence-page/qaq-p/854500
- In the link given above, I`ve pointed more links, where is described how to configure webDAV, which is essential.

# start:
1. Enter proper input and output paths in index.ts .
2. Input path - it accepts only flat structure. All .doc`s files should be in one catalog. 
3. run `npm start`. 
4. check output path.


# searching attached content:
Confluence (for me it was version 6.15.1) supports searching through content of files attached to pages. But(!) it does not thret does attachments as pages - so they (those attachments) have no parent- and ancestors pages. It means that you cant find any file-content with filter "find with ancestor" (in advanced search mode).
This is issue is already (years ago; 2014-15, if I recall well) submitted bug.

# other
There are other ways to solve given problem (bulk-import).
1. Confluence/Attlasian  provides real REST api, to perform all operations with pages. Yet I`ve encountered some issues with generating user-api-token...
2. You could use this api (or perform this manually...) to use build-in feature of "importing" files. Yet it breaks formatting , destroys tables etc....

When dropping files (catalogs) via webDAV, Confluence keeps track of checking if there are any catalogs (pages) with doubled (already existanced) names. If there will be any it will just throw an error, with no proper description of it or even pointing witch catalog/name made the problem