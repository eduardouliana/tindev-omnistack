const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    //só tem uma opção, não precisa ser objeto
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    //Cria uma coluna sozinho nas tabelas do banco
    //Armazena sozinho dados
    //CreateAt, UpdateAt
    timestamps: true,
});

module.exports = model('Dev', DevSchema);