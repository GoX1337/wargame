package com.gox.wargame.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Batalion {

    @Id
    @GeneratedValue
    private UUID id;

    private int x;

    private int y;

    public Batalion(){}

    public Batalion(int x, int y){
        this.x = x;
        this.y = y;
    }
}
