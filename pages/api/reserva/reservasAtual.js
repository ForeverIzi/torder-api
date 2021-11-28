import dbConnect from "../../../utils/dbConnect"; 
import Reserva from '../../../models/Reserva';
import Mesa from "../../../models/Mesa";
import Cliente from "../../../models/Cliente";
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const{ query: { id }, method } = req;

    switch(method){
        case 'GET':
            try{
                const reserva = [await Reserva.findById(id).where('status').equals('Ativa')];
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