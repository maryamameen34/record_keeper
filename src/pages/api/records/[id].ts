import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongodb';
import Record from '../../../../models/Record';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const record = await Record.findById(id);
        if (!record) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: record });
      } catch (error) {
        console.error('Error fetching record:', error);
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const updatedRecord = await Record.findByIdAndUpdate(
          id,
          body,
          { new: true, runValidators: true }
        );
        if (!updatedRecord) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedRecord });
      } catch (error:any) {
        console.error('Error updating record:', error);
        res.status(400).json({ success: false, err: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedRecord = await Record.findByIdAndDelete(id);
        if (!deletedRecord) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error deleting record:', error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
