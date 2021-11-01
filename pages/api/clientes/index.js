import dbConnect from "../../../utils/dbConnect"; 
import Cliente from '../../../models/Cliente';

dbConnect();

export default async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const clientes = await Cliente.find({});
                res.status(200).json({success: true, data: clientes})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha ao obter clientes! ${error}`});
            }
            break;
        case 'POST':
            try{
                const cliente = await Cliente.create(req.body);
                res.status(201).json({success: true, data: cliente})
            }catch(error){
                res.status(400).json({success: false, massage: `Falha ao cadastrar cliente! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, massage: "Requisição inválida"});
            break;
    }
}