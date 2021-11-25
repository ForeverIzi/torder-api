import dbConnect from "../../../utils/dbConnect"; 
import Restaurante from '../../../models/Restaurante';
import middlewareAuth from '../../../middlewares/auth';

dbConnect();

const handler = async(req, res) => {
    const{ query: { idRestaurante, estaAberto }, method } = req;

    switch(method){
        case 'PUT':
            try{
                const restaurante = await Restaurante.findByIdAndUpdate(idRestaurante, {estaAberto: estaAberto}, {
                    new: true,
                    runValidators: true
                });
                if(!restaurante){
                    return res.status(400).json({success: false, message: `Falha ao atualizar restaurante!`});
                }

                return res.status(200).json({success: true, restaurante: restaurante});
            }catch(error){
                return res.status(400).json({success: false, message: `Falha ao atualizar restaurante! ${error}`});
            }
            break;
        default:
            return res.status(400).json({success: false, message: "Requisição inválida"});
            break;
    }   
}
export default middlewareAuth(handler);