package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByEstLu(boolean estLu);

    long countByEstLu(boolean estLu);
}
