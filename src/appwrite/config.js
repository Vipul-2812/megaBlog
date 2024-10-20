import confi from "../config/confi";


import { Client, ID, Databases, Storage, Query } from "appwrite";

//*************************************************************************************************************************** */

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(confi.appwriteURL)
        .setProject(confi.appwritePROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

//------------------------------------------------------------------------------------------------

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                confi.appwriteDATABASE_ID,
                confi.appwriteCOLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    //----------------------------------------------------------------------------------------------

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                confi.appwriteDATABASE_ID,
                confi.appwriteCOLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    //----------------------------------------------------------------------------------------------------

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                confi.appwriteDATABASE_ID,
                confi.appwriteCOLLECTION_ID,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    //-----------------------------------------------------------------------------------------------------

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                confi.appwriteDATABASE_ID,
                confi.appwriteCOLLECTION_ID,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    //-------------------------------------------------------------------------------------------------------

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                confi.appwriteDATABASE_ID,
                confi.appwriteCOLLECTION_ID,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //---------------------------------------------------------------------------------------------------------

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confi.appwriteBUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    //-----------------------------------------------------------------------------------------------------------------

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                confi.appwriteBUCKET_ID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    //--------------------------------------------------------------------------------------------------------------------

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            confi.appwriteBUCKET_ID,
            fileId
        )
    }

    //-------------------------------------------------------------------------------------------------------------------------
}

//************************************ */


const service = new Service()
export default service