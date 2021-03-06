import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image'

@Entity('orphanages')
export default class Orphanage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @Column()
    status:boolean;

    //primeiro parâmetro, função que devolve tipo de retorno, segundo parâmetro, dado x imagem que recebi qual campo me retorna o relacionamento inverso
    @OneToMany(()=> Image,image => image.orphanage,{
        cascade:['insert','update']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: Image[]
}