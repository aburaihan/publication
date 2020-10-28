const contents = require('../model/contents');
const { response } = require('express');



var blank_response_struct = {
    status: "",
    success: null,
    message: "",
    type: "",
    action: "",
    id: null,
    data: null
};

exports.createContent = async (data) => {
    var responseStruct = Object.assign({}, blank_response_struct);
    if (!data.title ) {
        response.status = 400;
        return responseStruct;
    }

    let content_id = [];
    try {
        content_id = await contents.createNotification(data.title, 0, 0, 0);
    } catch{
        responseStruct.status = 500;
        return responseStruct;
    }
    responseStruct.status = 201;
    responseStruct.message = "created";
    return responseStruct;
}

exports.findContents = async (data) => {
    var responseStruct = Object.assign({}, blank_response_struct);
    if (!data.limit || !data.offset) {
        response.status = 400;
        return responseStruct;
    }
    let contentsSorted = [];
    try {
        contentsSorted = await contents.findContentsSortedByWt(data.limit, data.offset);
    } catch{
        responseStruct.status = 500;
        return responseStruct;
    }
    responseStruct.status = 200;
    responseStruct.data = contentsSorted;
    return responseStruct;
    
}

exports.updateContent = async (data) => {
    var responseStruct = Object.assign({}, blank_response_struct);
    // here send 0 for neutral reaction
    // like = 1 ,dislike = -1 ,no action = 0 
    // comment = 1 , delete comment = -1, no comment = 0;
    if (!data.id || !data.like || !data.comment) { 
        response.status = 400;
        return responseStruct;
    }
    let content = [];
    try {
        content = await contents.findContentsById(data.id);
    } catch{
        responseStruct.status = 500;
        return responseStruct;
    }

    if (content.length == 0) {
        responseStruct.status = 400;
        return responseStruct;
    }

    let contentUpdate =[];
    try {
        content = await contents.updateContent(data.id, content[0].title, content[0].total_likes + data.like, content[0].total_comments + data.comments, content[0].total_comments * 3 + content[0].total_likes);
    } catch{
        responseStruct.status = 500;
        return responseStruct;
    }

    if (content.length == 0) {
        responseStruct.status = 400;
        return responseStruct;
    }

}