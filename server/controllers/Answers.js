import mongoose from 'mongoose';
import Question from '../models/Questions.js'
import Questions from '../models/Questions.js';
export const postAnswer= async(req,res)=>{
    const  { id : _id}= req.params;
    const {noOfAnswer, answerBody, userAnswered, userId}= req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable....');

    }
    updateNoOfQuestions(_id, noOfAnswer)
    try {
        const updatedQuestion= await Questions.findByIdAndUpdate(_id, {$addToSet : {'answer' : [{answerBody, userAnswered, userId}]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json(error)
     
    
    }
}
const updateNoOfQuestions = async(_id,noOfAnswer)=>{
    try {
        await Questions.findByIdAndUpdate(_id, {$set: {'noOfAnswers' : noOfAnswer}})
    } catch (error) {
        console.log(error)
        
    }
}

export const deleteAnswer = async(req,res)=>{
    const {id : _id} =req.params;
   const {answerId, noOfAnswer}= req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('question unavailable....');
}

if (!mongoose.Types.ObjectId.isValid(answerId)){
    return res.status(404).send('Answer unavailable....');

}

updateNoOfQuestions(_id, noOfAnswer);
try {
    await Questions.updateOne(
        {_id},
        {$pull: {'answer' : {_id : answerId}}}
     )
     res.status(200).json({message : "Successfully Deleted..."});

    
} catch (error) {
    res.status(405).json(error)
    
}

 
}