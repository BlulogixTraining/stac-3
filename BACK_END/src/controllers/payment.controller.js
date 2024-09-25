const PaymentMethod = require('../Models/paymentMethods'); 
const mongoose = require('mongoose');




const createPaymentMethod = async (req, res) => {
    try 
    {
        const paymentMethod = new PaymentMethod(req.body);
        await paymentMethod.save();
        res.status(201).json({ message: 'Payment Method created' });
    } catch (error) 
    {
        res.status(500).json({error});
    }
};



const getAllPayments = async (req, res) => {
    try{
        const AllPayments = await PaymentMethod.find();
        res.status(200).json(AllPayments);
    }catch(error){
        res.status(500).json({error});
    }
}


const getPaymentMethods = async (req, res) => {
    try 
    {
        const userId = req.params.userId;
        const paymentMethods = await PaymentMethod.find({ user_id: userId });
        res.status(200).json(paymentMethods);
    } catch (error)
    {
        res.status(500).json({error});
    }
};





const getPaymentMethodById = async (req, res) => {
    try 
    {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) 
        {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        res.status(200).json(paymentMethod);
    } catch (error) 
    {
        res.status(500).json({ error});
    }
};





const updatePaymentMethod = async (req, res) => {
    try 
    {
        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPaymentMethod) 
        {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        res.status(200).json(updatedPaymentMethod);
    } catch (error) 
    {
        res.status(500).json({ error});
    }
};





const deletePaymentMethod = async (req, res) => {
    try 
    {
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
        if (!deletedPaymentMethod) 
        {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        res.status(200).json({ message: 'Payment method delete successfully' });
    } catch (error) 
    {
        res.status(500).json({error});
    }
};
















module.exports = {
    createPaymentMethod,
    getAllPayments,
    getPaymentMethods,
    getPaymentMethodById,
    updatePaymentMethod,
    deletePaymentMethod,
  };