import dbConnect from "../../../utils/dbConnect"; 
import Cliente from '../../../models/Cliente';
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const { method } = req;
    switch(method){
        case 'GET':
            try{
                const clientes = await Cliente.find({});
                res.status(200).json({success: true, clientes: clientes})
            }catch(error){
                res.status(400).json({success: false, message: `Falha ao obter clientes! ${error}`});
            }
            break;
        case 'POST':
            try{
                const cliente = await Cliente.create(req.body);
                res.status(201).json({success: true, cliente: cliente})
            }catch(error){
                res.status(400).json({success: false, message: `Falha ao cadastrar cliente! ${error}`});
            }
            break;
        default:
            res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }
}

export default middlewareAuth(handler);