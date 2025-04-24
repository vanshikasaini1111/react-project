import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create Post
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            // Check if featuredImage is null/undefined
            const documentData = {
                title,
                content,
                status,
                userId,
            };

            if (featuredImage) {
                documentData.featuredimage = featuredImage; // Use correct field name from Appwrite database
            }

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                documentData
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // Update Post
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const documentData = {
                title,
                content,
                status,
            };

            if (featuredImage) {
                documentData.featuredimage = featuredImage; // Use correct field name from Appwrite database
            }

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                documentData
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // Delete Post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Get Post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Get Posts (Active by default)
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // File upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // Delete file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // Get file preview
  
    getFilePreview(fileId) {
        if (!fileId) {
            console.log("Invalid fileId", fileId);  // Add logging for debugging
            return null;  // Return a fallback or an empty value if fileId is invalid
        }
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
    
}

const service = new Service();
export default service;
