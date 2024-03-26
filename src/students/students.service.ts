import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsEntity, OfferedCoursesEntity, ParkingEntity, CoreCurriculam, OfferedClubs  } from './students.entity';
import { Repository } from 'typeorm';
import { CoreCurriculamDto, CreateStudentsDto, OfferedClubsDto, OfferedCoursesDto, ParkingDto, UpdateStudentsDto } from './students.dto';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(StudentsEntity) private studentsRepo: Repository<StudentsEntity>,@InjectRepository(OfferedCoursesEntity) private courseRepo: Repository<OfferedCoursesEntity>,
  @InjectRepository(ParkingEntity) private parkingRepo: Repository<ParkingEntity>,
  @InjectRepository(CoreCurriculam) private curriculamRepo: Repository<CoreCurriculam>,
  @InjectRepository(OfferedClubs) private offeredClubsRepo: Repository<OfferedClubs>,
  ) {}
  

  createStudents(createStudents: CreateStudentsDto): Promise<CreateStudentsDto> {
    return this.studentsRepo.save(createStudents);
  }

  async updateStudents(id: number, updateStudent: UpdateStudentsDto) {
    return await this.studentsRepo.update(id, updateStudent);
  }

  createCourse(createCourse: OfferedCoursesDto) {
    return this.courseRepo.save(createCourse);
  }

  searchCourseBySemister(semister: string): Promise<OfferedCoursesEntity[]>{
  return this.courseRepo.find({where: {semister}})
  }

  applyParking(parking: ParkingDto): Promise<ParkingDto> {
    return this.parkingRepo.save(parking);
  }

  coreCurriculam(createCuriculam: CoreCurriculamDto){
    return this.curriculamRepo.save(createCuriculam);
  }

  async findCurriculam(): Promise<CoreCurriculam[]>{
    return this.curriculamRepo.find()
  }
  
  createOfferedClubs(createClubsDto: OfferedClubsDto) {
    return this.offeredClubsRepo.save(createClubsDto);
  }

  async findClubs(): Promise<OfferedClubs[]>{
    return this.offeredClubsRepo.find()
  }
}
