var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'publications'
    }
});




exports.createNotification = async (title, total_likes, total_comments, aggr_wt) => {
    const resp = await knex('contents').insert({ title: title, total_likes: total_likes, total_comments: total_comments, aggr_wt: aggr_wt });
    return resp;
}

exports.findContentsById = async (id) => {
    const resp = await knex.select('*').from('contents').where('id', id);
    return resp;
}

exports.findContentsSortedByWt = async ( limit, offset) => {
    const resp = await knex('contents').orderBy('aggr_wt').limit(limit).offset(offset);
    return resp;
}


exports.updateContent = async (id, title, total_likes, total_comments, aggr_wt) => {
    const resp = await knex('contents').where('id',id).update({ title: title, total_likes: total_likes, total_comments: total_comments, aggr_wt: aggr_wt });
    return resp;
}

