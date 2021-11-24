import dbConnect from "../../../utils/dbConnect"; 
import Restaurante from '../../../models/Restaurante';
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const restaurantes = await Restaurante.find();
                res.status(200).json({success: true, restaurantes: restaurantes})
            }catch(error){
                res.status(400).json({success: false, message: "Falha ao obter restaurantes!"});
            }
            break;
        case 'POST':
            try{
                const restaurante = await Restaurante.create(req.body);
                res.status(201).json({success: true, restaurante: restaurante})
            }catch(error){
                res.status(400).json({success: false, message: `Falha na criação do restaurante! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}
export default middlewareAuth(handler);