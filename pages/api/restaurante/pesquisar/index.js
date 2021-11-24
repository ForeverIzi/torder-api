import dbConnect from "../../../../utils/dbConnect"; 
import Restaurante from '../../../../models/Restaurante';
import middlewareAuth from '../../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const{ method } = req;
    const pesquisa = req.query.pesquisa;

    switch(method){
        case 'GET':
            try{
                const restaurante = await Restaurante.find({nomeFantasia: {$regex: '.*'+ pesquisa +'.*',$options: 'i'}});
                if(!restaurante){
                    return res.status(400).json({success: false,message: `Falha ao obter restaurantes! ${error}`});
                }

                return res.status(200).json({success: true, restaurante: restaurante});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter restaurantes! ${error}`});
            }
            break;
    }   
}
export default middlewareAuth(handler);