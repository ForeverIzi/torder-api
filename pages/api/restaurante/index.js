import dbConnect from "../../../utils/dbConnect"; 
import Restaurante from '../../../models/Restaurante';

dbConnect();

export default async(req, res) => {
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
                console.log(req.body);
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