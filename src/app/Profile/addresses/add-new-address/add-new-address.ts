import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-address.html',
  styleUrl: './add-new-address.css',
})
export class AddNewAddress implements OnInit {
  form!: FormGroup;
  filteredCities: string[] = [];
  
  // خاصية للتحكم في إظهار أو إخفاء الـ Popup من خلال الـ TS (اختياري)
  isModalOpen: boolean = true;

  governorateList = [
    { key: 'cairo', name: 'Cairo' },
    { key: 'alexandria', name: 'Alexandria' },
    { key: 'giza', name: 'Giza' },
    { key: 'qalyubia', name: 'Qalyubia' },
    { key: 'port_said', name: 'Port Said' },
    { key: 'suez', name: 'Suez' },
    { key: 'damietta', name: 'Damietta' },
    { key: 'dakahlia', name: 'Dakahlia' },
    { key: 'gharbia', name: 'Gharbia' },
    { key: 'monufia', name: 'Monufia' },
    { key: 'sharqia', name: 'Sharqia' },
    { key: 'kafr_el_sheikh', name: 'Kafr El Sheikh' },
    { key: 'beheira', name: 'Beheira' },
    { key: 'ismailia', name: 'Ismailia' },
    { key: 'beni_suef', name: 'Beni Suef' },
    { key: 'faiyum', name: 'Faiyum' },
    { key: 'minya', name: 'Minya' },
    { key: 'asyut', name: 'Asyut' },
    { key: 'sohag', name: 'Sohag' },
    { key: 'qena', name: 'Qena' },
    { key: 'luxor', name: 'Luxor' },
    { key: 'aswan', name: 'Aswan' },
    { key: 'red_sea', name: 'Red Sea' },
    { key: 'new_valley', name: 'New Valley' },
    { key: 'matrouh', name: 'Matrouh' },
    { key: 'north_sinai', name: 'North Sinai' },
    { key: 'south_sinai', name: 'South Sinai' }
  ];

  citiesMap: { [key: string]: string[] } = {
    cairo: ['Cairo City', 'New Cairo', 'Heliopolis', 'Nasr City', 'Maadi', 'Zamalek', 'Shoubra', 'Helwan', 'El Shorouk', 'Badr City', 'Madinaty', 'Mokattam', 'Sayeda Zeinab', 'Abbassia', 'El Salam City', 'El Marg', 'Ain Shams', 'Ezbet El Nakhal', 'El Matareya', 'New Administrative Capital'],
    alexandria: ['Alexandria City', 'Borg El Arab', 'Abu Qir', 'Al Sharef', 'El Mamoura', 'Smouha', 'Miami', 'Sidi Gaber', 'Al Agamy', 'El Mansheya', 'Mandara', 'Asafra', 'El Ibrahimia', 'Roushdy', 'Kafr Abdo', 'Gleem', 'Stanley', 'San Stefano'],
    giza: ['Giza City', '6th of October', 'Sheikh Zayed', 'Al Haram', 'Faisal', 'Dokki', 'Mohandessin', 'Imbaba', 'Agouza', 'Kerdasa', 'Al Badrashein', 'Al Ayat', 'Atfih', 'Abu Nomros', 'Oseem', 'El Wahat El Bahariya'],
    qalyubia: ['Banha', 'Qalyub', 'Shubra El Kheima', 'El Khanka', 'El Qanater El Khayreya', 'Shebin Al Qanater', 'Toukh', 'Qaha', 'Kafr Shukr'],
    port_said: ['Port Said City', 'Port Fouad', 'Al Arab', 'Al Sharq', 'Al Manakh', 'Al Dawahy', 'Al Zohour'],
    suez: ['Suez City', 'El Arbaeen', 'Ataqah', 'Faisal', 'Al Ganayen'],
    damietta: ['Damietta City', 'New Damietta', 'Ras El Bar', 'Faraskour', 'Kafr Saad', 'Alzarka', 'Kafr El-Batikh'],
    dakahlia: ['Mansoura', 'Talkha', 'Mit Ghamr', 'Dekernes', 'Senbellawein', 'El Matareya', 'Belqas', 'Manzala', 'Aga', 'Sherbin', 'Bani Ubayd', 'El Kurdi', 'Miat Salsil', 'El Gammaliyah'],
    gharbia: ['Tanta', 'El Mahalla El Kobra', 'Kafr El Zayat', 'Zifta', 'Samanoud', 'Basyoun', 'Qutur', 'El Santa'],
    monufia: ['Shibin El Kom', 'Sadat City', 'Menouf', 'Ashmoun', 'Quesna', 'Tala', 'Bagour', 'Al Shohada', 'Sers El-Lyan'],
    sharqia: ['Zagazig', '10th of Ramadan', 'Bilbeis', 'Abu Hammad', 'Minya El Qamh', 'Faqous', 'Abu Kebir', 'Hehia', 'Kafr Saqr', 'Awlad Saqr', 'Diyarb Negm', 'El Husseiniya'],
    kafr_el_sheikh: ['Kafr El Sheikh City', 'Desouk', 'Baltim', 'Metoubes', 'Foah', 'Qallin', 'Sidi Salem', 'Riyadh', 'El Hamoul', 'Bila'],
    beheira: ['Damanhour', 'Kafr El Dawar', 'Kom Hamada', 'Rashid (Rosetta)', 'Abu Hummus', 'Edko', 'Itay El Baroud', 'Hosh Issa', 'Abu El Matamir', 'Delengat', 'Mahmoudiyah', 'Rahmaniyah', 'Wadi El Natrun', 'Badr'],
    ismailia: ['Ismailia City', 'El Qantara', 'Fayed', 'El Tell El Kebir', 'Abu Suwir', 'Kassassin'],
    beni_suef: ['Beni Suef City', 'Biba', 'El Wasty', 'Nasser', 'Ahnasia', 'Somosta', 'El Fashn'],
    faiyum: ['Faiyum City', 'Sinnuris', 'Ibshaway', 'Itsa', 'Tamiya', 'Yusuf El Seddik'],
    minya: ['Minya City', 'Mallawi', 'Samalut', 'Abu Qurqas', 'Bani Mazar', 'Maghagha', 'El Idwa', 'Deir Mawas', 'Mattay'],
    asyut: ['Asyut City', 'Dairut', 'Manfalut', 'Abou Tig', 'El Badari', 'Sodfa', 'Gheniem', 'Sahel Selim', 'Al Qusia', 'Abnoub', 'Fateh'],
    sohag: ['Sohag City', 'Akhmim', 'Jirja', 'Tahta', 'Tema', 'Maragha', 'El Balyana', 'Dar El Salam', 'Juhayna', 'Sakalta', 'Monsha\'at'],
    qena: ['Qena City', 'Nag Hammadi', 'Deshna', 'Armant', 'Abu Tesht', 'Qus', 'Naqada', 'Farshut', 'Waqf'],
    luxor: ['Luxor City', 'Esna', 'El Tod', 'Armant', 'Qurna', 'Zeiniya', 'Bayadiya'],
    aswan: ['Aswan City', 'Kom Ombo', 'Edfu', 'Daraw', 'Nasr El Nuba', 'Abu Simbel'],
    red_sea: ['Hurghada', 'El Gouna', 'Safaga', 'Marsa Alam', 'Quseir', 'Shalateen', 'Halayeb', 'Ras Gharib'],
    new_valley: ['Kharga', 'Dakhla', 'Farafra', 'Mut', 'Paris', 'Balat'],
    matrouh: ['Marsa Matrouh', 'Siwa', 'El Alamein', 'Dabaa', 'Sidi Abdel Rahman', 'Sallum', 'Hamam', 'Negaila'],
    north_sinai: ['Arish', 'Sheikh Zuweid', 'Rafah', 'Bir El Abd', 'Hassana', 'Nakhl'],
    south_sinai: ['Sharm El Sheikh', 'Dahab', 'Nuweiba', 'Taba', 'Tor Sinai', 'Saint Catherine', 'Ras Sudr', 'Abu Zenima', 'Abu Redeis']
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.listenToGovernorateChange();
  }

  // بناء الفورم وإضافة الحقول والـ Validators المطلوبة
  private initForm(): void {
    this.form = this.fb.group({
      addressType: ['home', Validators.required], // نوع العنوان (افتراضياً Home)
      governorate: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      streetAddress: ['', Validators.required],
      buildingNumber: ['', Validators.required],
      apartmentNumber: ['', Validators.required],
      landmark: [''] // اختياري
    });
  }

  // مراقبة تغيير المحافظة لتحديث قائمة المدن فوراً وتصفير اختيار المدينة السابقة
  private listenToGovernorateChange(): void {
    this.form.get('governorate')?.valueChanges.subscribe((govKey: string) => {
      if (govKey && this.citiesMap[govKey]) {
        this.filteredCities = this.citiesMap[govKey];
      } else {
        this.filteredCities = [];
      }
      // تصفير قيمة المدينة عند تغيير المحافظة
      this.form.get('city')?.setValue('');
    });
  }

  // عند الضغط على زر Add وحفظ العنوان
  onSubmit(): void {
    if (this.form.valid) {
      console.log('Address Data Submitted:', this.form.value);
      // هنا يمكنك إرسال البيانات للـ API أو إغلاق المودال
      this.closeModal();
    } else {
      this.form.markAllAsTouched(); // إظهار رسائل الخطأ لكل الحقول الفارغة
    }
  }

  // دالة لإغلاق النافذة المنبثقة
  closeModal(): void {
    this.isModalOpen = false;
    this.form.reset({ addressType: 'home', governorate: '', city: '' });
  }
  @Output() onClose = new EventEmitter<void>();

  // الكود القديم للفورم والمحافظات...

  // دالة الإلغاء التي يتم استدعاؤها عند الضغط على الزر
  cancel(): void {
    this.onClose.emit(); // هتبعت إشارة للـ profile عشان يخلي showAddNewAddressModal بـ false
  }
}