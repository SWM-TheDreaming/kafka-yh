import express from "express";
import kafka from "../kafka/kafka.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const producer = kafka.producer();
const consumer = kafka.consumer({
  groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
});

const run = async () => {
  await consumer.subscribe({ topic: "nodejs-kafka-test", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        topic,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run();
/* GET home page. */
router.get("/producer/:message", async function (req, res, next) {
  const params = req.params;
  const message = params.message;
  try {
    //producing
    await producer.connect();
    await producer.send({
      topic: "nodejs-kafka-test",
      messages: [
        {
          value: JSON.stringify(params),
        },
        {
          value: JSON.stringify(params),
        },
      ],
    });
    return res.json({
      stauts: "success",
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
