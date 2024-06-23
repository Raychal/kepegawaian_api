const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const budi = await prisma.employee.create({
    data : {
      nik: '11012',
      name: 'Budi',
      is_active: true,
      start_date: new Date('2022-12-12'),
      end_date: new Date('2029-12-12'),
      created_by: 'Admin',
      updated_by: 'Admin',
      created_at: new Date(),
      updated_at: new Date(),
      profile: {
        create: {
          place_of_birth: 'Jakarta',
          date_of_birth: new Date('1997-05-02'),
          gender: 'Laki',
          is_married: true,
          prof_pict: null,
          created_by: 'Admin',
          updated_by: 'Admin',
          created_at: new Date(),
          updated_at: new Date()
        },
      },
      family: {
        create: [
            {
              name: 'Marni',
              identifier: '32100594109960002',
              job: 'Ibu Rumah Tangga',
              place_of_birth: 'Denpasar',
              date_of_birth: new Date('1995-10-17'),
              religion: 'Islam',
              is_life: true,
              is_divorced: false,
              relation_status: 'Istri',
              created_by: 'Admin',
              updated_by: 'Admin',
              created_at: new Date(),
              updated_at: new Date()
            },
            {
              name: 'Clara',
              identifier: '32100594109020004',
              job: 'Pelajar',
              place_of_birth: 'Bangkalan',
              date_of_birth: new Date('2008-10-17'),
              religion: 'Islam',
              is_life: true,
              is_divorced: false,
              relation_status: 'Anak',
              created_by: 'Admin',
              updated_by: 'Admin',
              created_at: new Date(),
              updated_at: new Date()
            },
            {
              name: 'Stephanie',
              identifier: '32100594109020005',
              job: 'Pelajar',
              place_of_birth: 'Bangkalan',
              date_of_birth: new Date('2008-10-17'),
              religion: 'Islam',
              is_life: true,
              is_divorced: false,
              relation_status: 'Anak',
              created_by: 'Admin',
              updated_by: 'Admin',
              created_at: new Date(),
              updated_at: new Date()
            },
        ],
      },
      education: {
        create: {
          name: 'SMKN 7 Jakarta',
          level: 'Sma',
          description: 'Sekolah Menengah Atas',
          created_by: 'Admin',
          updated_by: 'Admin',
          created_at: new Date(),
          updated_at: new Date()
        },
      },
    },
    })

  const jarot = await prisma.employee.create({
    data: {
        nik: '11013',
        name: 'Jarot',
        is_active: true,
        start_date: new Date('2021-09-01'),
        end_date: new Date('2028-09-01'),
        created_by: 'Admin',
        updated_by: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
        profile: {
            create: {
                place_of_birth: 'Sukabumi',
                date_of_birth: new Date('1996-05-02'),
                gender: 'Laki',
                is_married: true,
                prof_pict: null,
                created_by: 'Admin',
                updated_by: 'Admin',
                created_at: new Date(),
                updated_at: new Date()
            },
        },
        education: {
            create: {
                name: 'Universitas Negeri Jakarta',
                level: 'Strata1',
                description: 'Sarjana',
                created_by: 'Admin',
                updated_by: 'Admin',
                created_at: new Date(),
                updated_at: new Date()
            },
        },
    }
    })

  console.log({ budi, jarot })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })