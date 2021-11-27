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
                const mesas = Mesa.find({restaurante: restauranteId});
                mesas.count(function (err, count) {
                    if (err) 
                        res.status(400).json({success: false, message: `Falha ao obter total de mesas! ${err}`});
                    else 
                        res.status(200).json({success: true, totalMesas: count})
                    });
               
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