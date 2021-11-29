import dbConnect from "../../../utils/dbConnect"; 
import Reserva from '../../../models/Reserva';
import Mesa from "../../../models/Mesa";
import middlewareAuth from '../../../middlewares/auth';
import Restaurante from '../../../models/Restaurante';

dbConnect();

const handler = async(req, res) => {
    const{ query: { idCliente }, method } = req;

    switch(method){
        case 'GET':
            try{
                const reserva = await Reserva.find({cliente: idCliente}).where('status').equals('Reservado').populate({ path: 'mesa', model: Mesa, populate : { path: 'restaurante', model: Restaurante}});
                if(!reserva){
                    return res.status(400).json({success: false});
                }

                return res.status(200).json({success: true, reserva: reserva});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao obter reserva! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);