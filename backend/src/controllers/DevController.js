const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const logedUser = await Dev.findById(user);

        const users = await Dev.find( {
            $and: [
                //ne = Not Equal (Não pega o próprio usuário)
                { _id: { $ne: user } },
                //ni = Not In (Não pega os usuários que já tiver dado like)
                { _id: { $ni: logedUser.likes } },
                //ni = Not In (Não pega os usuários que já tiver dado dislike)
                { _id: { $ni: logedUser.dislikes } },
            ],
        });

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        //Busca usuário do banco
        const userExists = await Dev.findOne({ user: username});

        //Caso já esteja cadastrado retorna ele mesmo
        if (userExists) {
            return res.json(userExists);
        }

        //Requisição para API do github
        const response = await axios.get(`https://api.github.com/users/${username}`);

        //Pega esses campos do json que vem da API do github
        const { name, bio, avatar_url: avatar} = response.data;

        //Insere no banco o Dev
        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar: avatar
        });

        //Retorna o retorno que vem da própia inserção
        return res.json(dev);
    }
};