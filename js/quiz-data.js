/**
 * quiz-data.js
 * Bank soal quiz. Setiap subjek memiliki array pertanyaan.
 * "answer" adalah index (0-based) dari opsi yang benar.
 */

const QUIZ_BANK = {
  matematika: {
    label: "Matematika",
    durasiDetik: 180,
    soal: [
      {
        pertanyaan: "Hasil dari 3x + 5 = 20 adalah x = ...",
        opsi: ["3", "5", "7", "15"],
        jawaban: 1
      },
      {
        pertanyaan: "Nilai dari 2\u00B3 + 3\u00B2 adalah ...",
        opsi: ["15", "16", "17", "18"],
        jawaban: 2
      },
      {
        pertanyaan: "Keliling lingkaran dengan jari-jari 7 cm (\u03C0 = 22/7) adalah ...",
        opsi: ["22 cm", "44 cm", "49 cm", "66 cm"],
        jawaban: 1
      },
      {
        pertanyaan: "Jika f(x) = 2x - 1, maka f(4) = ...",
        opsi: ["6", "7", "8", "9"],
        jawaban: 1
      },
      {
        pertanyaan: "Bentuk sederhana dari 12/18 adalah ...",
        opsi: ["1/2", "2/3", "3/4", "4/6"],
        jawaban: 1
      }
    ]
  },
  fisika: {
    label: "Fisika",
    durasiDetik: 180,
    soal: [
      {
        pertanyaan: "Satuan SI untuk gaya adalah ...",
        opsi: ["Joule", "Newton", "Watt", "Pascal"],
        jawaban: 1
      },
      {
        pertanyaan: "Rumus percepatan adalah ...",
        opsi: ["a = v/t", "a = m.v", "a = F.t", "a = s/t\u00B2"],
        jawaban: 0
      },
      {
        pertanyaan: "Benda bermassa 2 kg mengalami gaya 10 N. Percepatannya adalah ...",
        opsi: ["2 m/s\u00B2", "5 m/s\u00B2", "10 m/s\u00B2", "20 m/s\u00B2"],
        jawaban: 1
      },
      {
        pertanyaan: "Alat untuk mengukur arus listrik adalah ...",
        opsi: ["Voltmeter", "Termometer", "Amperemeter", "Barometer"],
        jawaban: 2
      },
      {
        pertanyaan: "Cahaya merambat dalam bentuk ...",
        opsi: ["Gelombang longitudinal", "Gelombang transversal", "Partikel padat", "Arus listrik"],
        jawaban: 1
      }
    ]
  },
  biologi: {
    label: "Biologi",
    durasiDetik: 180,
    soal: [
      {
        pertanyaan: "Organel sel yang berfungsi sebagai penghasil energi adalah ...",
        opsi: ["Ribosom", "Mitokondria", "Nukleus", "Lisosom"],
        jawaban: 1
      },
      {
        pertanyaan: "Proses pembentukan makanan pada tumbuhan disebut ...",
        opsi: ["Respirasi", "Transpirasi", "Fotosintesis", "Fermentasi"],
        jawaban: 2
      },
      {
        pertanyaan: "Sistem peredaran darah manusia dipompa oleh ...",
        opsi: ["Paru-paru", "Jantung", "Hati", "Ginjal"],
        jawaban: 1
      },
      {
        pertanyaan: "DNA merupakan singkatan dari ...",
        opsi: ["Deoxyribonucleic Acid", "Dynamic Nucleus Acid", "Double Nucleotide Acid", "Deoxyribose Nitrogen Acid"],
        jawaban: 0
      },
      {
        pertanyaan: "Contoh tumbuhan berbiji terbuka (Gymnospermae) adalah ...",
        opsi: ["Mangga", "Pinus", "Padi", "Jagung"],
        jawaban: 1
      }
    ]
  },
  bindo: {
    label: "Bahasa Indonesia",
    durasiDetik: 180,
    soal: [
      {
        pertanyaan: "Kalimat yang menggunakan kata baku adalah ...",
        opsi: ["Saya akan pergi ke apotek", "Saya akan pergi ke apotik", "Saya akan pergi ke aphotek", "Saya akan pergi ke apotheek"],
        jawaban: 0
      },
      {
        pertanyaan: "Ide pokok sebuah paragraf biasanya terdapat pada kalimat ...",
        opsi: ["Penjelas", "Utama", "Penutup acak", "Semua kalimat tanpa urutan"],
        jawaban: 1
      },
      {
        pertanyaan: "Sinonim dari kata 'bahagia' adalah ...",
        opsi: ["Sedih", "Gembira", "Marah", "Takut"],
        jawaban: 1
      },
      {
        pertanyaan: "Teks yang bertujuan meyakinkan pembaca disebut teks ...",
        opsi: ["Narasi", "Deskripsi", "Persuasi", "Eksposisi netral"],
        jawaban: 2
      },
      {
        pertanyaan: "Kata 'mereka' termasuk jenis kata ...",
        opsi: ["Kata benda", "Kata kerja", "Kata ganti", "Kata sifat"],
        jawaban: 2
      }
    ]
  },
  bing: {
    label: "Bahasa Inggris",
    durasiDetik: 180,
    soal: [
      {
        pertanyaan: "Choose the correct sentence:",
        opsi: ["She go to school every day", "She goes to school every day", "She going to school every day", "She gone to school every day"],
        jawaban: 1
      },
      {
        pertanyaan: "The opposite of 'expensive' is ...",
        opsi: ["Costly", "Cheap", "Rich", "Valuable"],
        jawaban: 1
      },
      {
        pertanyaan: "\"I ___ my homework yesterday.\" The correct verb is ...",
        opsi: ["do", "did", "does", "doing"],
        jawaban: 1
      },
      {
        pertanyaan: "Which word is a synonym for 'happy'?",
        opsi: ["Angry", "Joyful", "Tired", "Bored"],
        jawaban: 1
      },
      {
        pertanyaan: "Choose the correct question form:",
        opsi: ["Where you are going?", "Where are you going?", "Where going you are?", "You where are going?"],
        jawaban: 1
      }
    ]
  }
};
