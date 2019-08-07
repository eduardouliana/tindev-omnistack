const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;
        
        //Pega o usuário logado
        const loggedDev = await Dev.findById(user);
        //Pega o usuário alvo 
        const targetDev = await Dev.findById(devId);

        //Caso não achou o usuário alvo do dislike
        if (!targetDev) {
            return res.status(400).json( { error: 'Desenvolvedor não encontrado'});
        }

        //Adiciona o ID para o vetor de dislikes do usuário
        loggedDev.dislikes.push(targetDev._id);
        //persiste no banco
        await loggedDev.save();

        return res.json({ ok: true });

    }
}