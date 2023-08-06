package com.spring.kafkaconsumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class KafkaConsumer {

    @KafkaListener(topics = "hwany-issue", groupId = "hwany-group")
    public void consume(String message) throws IOException {
        log.info("Consumed Message : {}", message);
    }
}