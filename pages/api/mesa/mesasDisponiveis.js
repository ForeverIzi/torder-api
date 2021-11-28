import dbConnect from "../../../utils/dbConnect"; 
import Mesa from '../../../models/Mesa';
import Restaurante from "../../../models/Restaurante";
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const { query: { restauranteId},method } = req;
    switch(method){
        case 'GET':
            try{
                const mesas = await Mesa.find({restaurante: restauranteId}).where('status').equals('Disponivel');
                console.log(mesas);
                if(!mesas){
                    return res.status(400).json({success: false});
                }

               res.status(200).json({success: true, mesas: mesas})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na obter mesas! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}
export default middlewareAuth(handler);