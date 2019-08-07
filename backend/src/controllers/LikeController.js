const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;
        
        //Pega o usuário logado
        const loggedDev = await Dev.findById(user);
        //Pega o usuário alvo 
        const targetDev = await Dev.findById(devId);

        //Caso não achou o usuário alvo do like
        if (!targetDev) {
            return res.status(400).json( { error: 'Desenvolvedor não encontrado'});
        }

        //Caso o usuário que está dando like já tiver ganhado like do mesmo
        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH - VER DEPOIS');
        }

        //Adiciona o ID para o vetor de likes do usuário
        loggedDev.likes.push(targetDev._id);
        //persiste no banco
        await loggedDev.save();

        return res.json({ ok: true });

    }
}