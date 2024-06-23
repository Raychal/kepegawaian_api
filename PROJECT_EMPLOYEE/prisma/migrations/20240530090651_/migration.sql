-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Laki-laki', 'Perempuan');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu');

-- CreateEnum
CREATE TYPE "ReligionStatus" AS ENUM ('Suami', 'Istri', 'Anak', 'Anak Sambung');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Docter', 'Profesor');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "nik" TEXT,
    "name" TEXT,
    "is_active" BOOLEAN NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeProfile" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "place_of_birth" TEXT,
    "date_of_birth" DATE,
    "gender" "Gender" NOT NULL,
    "is_married" BOOLEAN NOT NULL,
    "prof_pict" TEXT,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeFamily" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "name" TEXT,
    "identifier" TEXT,
    "job" TEXT,
    "place_of_birth" TEXT,
    "date_of_birth" DATE,
    "religion" "Religion" NOT NULL,
    "is_life" BOOLEAN NOT NULL,
    "is_divorced" BOOLEAN NOT NULL,
    "relation_status" "ReligionStatus" NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeFamily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "description" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_employee_id_key" ON "EmployeeProfile"("employee_id");

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeFamily" ADD CONSTRAINT "EmployeeFamily_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
