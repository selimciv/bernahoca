const gameData = {
    title: "English Vocabulary Challenge",
    preparedBy: "Demet Hoca",
    answerTime: 25,
    defaultGroup: 2,
    groupNames: ["Team A", "Team B", "Team C", "Team D"],
    levelData: {
        A1: [
            {
                name: "Family",
                pool: [
                    { answer: "Mother", pronunciation: "Madır", question: "Anne", example: "My mother is a teacher.", exampleTR: "Annem bir öğretmendir." },
                    { answer: "Father", pronunciation: "Fadır", question: "Baba", example: "His father works at a bank.", exampleTR: "Babası bir bankada çalışıyor." },
                    { answer: "Sister", pronunciation: "Sistır", question: "Kız kardeş", example: "I have one sister.", exampleTR: "Bir kız kardeşim var." },
                    { answer: "Brother", pronunciation: "Bradır", question: "Erkek kardeş", example: "My brother plays football.", exampleTR: "Erkek kardeşim futbol oynar." },
                    { answer: "Baby", pronunciation: "Beybi", question: "Bebek", example: "The baby is sleeping.", exampleTR: "Bebek uyuyor." },
                    { answer: "Grandmother", pronunciation: "Grendmadır", question: "Büyükanne", example: "My grandmother makes great cakes.", exampleTR: "Büyükannem harika kekler yapar." },
                    { answer: "Grandfather", pronunciation: "Grendfadır", question: "Büyükbaba", example: "My grandfather is 80 years old.", exampleTR: "Büyükbabam 80 yaşında." },
                    { answer: "Uncle", pronunciation: "Ankıl", question: "Amca/Dayı", example: "My uncle lives in London.", exampleTR: "Amcam Londra'da yaşıyor." },
                    { answer: "Aunt", pronunciation: "Ant", question: "Hala/Teyze", example: "My aunt is visiting us.", exampleTR: "Halam bizi ziyaret ediyor." },
                    { answer: "Cousin", pronunciation: "Kazın", question: "Kuzen", example: "My cousin is my best friend.", exampleTR: "Kuzenim benim en iyi arkadaşımdır." }
                ]
            },
            {
                name: "Numbers",
                pool: [
                    { answer: "One", pronunciation: "Wan", question: "Bir", example: "I have one apple.", exampleTR: "Bir elmam var." },
                    { answer: "Two", pronunciation: "Tu", question: "İki", example: "She has two cats.", exampleTR: "Onun iki kedisi var." },
                    { answer: "Three", pronunciation: "Tri", question: "Üç", example: "There are three books on the table.", exampleTR: "Masada üç kitap var." },
                    { answer: "Four", pronunciation: "For", question: "Dört", example: "A car has four wheels.", exampleTR: "Bir arabanın dört tekerleği vardır." },
                    { answer: "Five", pronunciation: "Fayv", question: "Beş", example: "Give me five minutes.", exampleTR: "Bana beş dakika ver." },
                    { answer: "Ten", pronunciation: "Ten", question: "On", example: "I have ten fingers.", exampleTR: "On parmağım var." },
                    { answer: "Twenty", pronunciation: "Twenti", question: "Yirmi", example: "He is twenty years old.", exampleTR: "O yirmi yaşında." },
                    { answer: "Hundred", pronunciation: "Handrıd", question: "Yüz", example: "This costs one hundred dollars.", exampleTR: "Bu yüz dolar tutuyor." },
                    { answer: "First", pronunciation: "Fırst", question: "Birinci", example: "She won the first prize.", exampleTR: "Birincilik ödülünü kazandı." },
                    { answer: "Second", pronunciation: "Sekınd", question: "İkinci", example: "This is my second visit.", exampleTR: "Bu benim ikinci ziyaretim." }
                ]
            },
            {
                name: "Colors",
                pool: [
                    { answer: "Red", pronunciation: "Red", question: "Kırmızı", example: "The apple is red.", exampleTR: "Elma kırmızıdır." },
                    { answer: "Blue", pronunciation: "Blu", question: "Mavi", example: "The sky is blue.", exampleTR: "Gökyüzü mavidir." },
                    { answer: "Green", pronunciation: "Grin", question: "Yeşil", example: "Grass is green.", exampleTR: "Çimen yeşildir." },
                    { answer: "Yellow", pronunciation: "Yelo", question: "Sarı", example: "The sun is yellow.", exampleTR: "Güneş sarıdır." },
                    { answer: "Black", pronunciation: "Blek", question: "Siyah", example: "I have a black cat.", exampleTR: "Siyah bir kedim var." },
                    { answer: "White", pronunciation: "Wayt", question: "Beyaz", example: "Snow is white.", exampleTR: "Kar beyazdır." },
                    { answer: "Orange", pronunciation: "Orınc", question: "Turuncu", example: "Oranges are orange.", exampleTR: "Portakallar turuncudur." },
                    { answer: "Purple", pronunciation: "Pörpıl", question: "Mor", example: "She likes purple flowers.", exampleTR: "O mor çiçekleri sever." },
                    { answer: "Pink", pronunciation: "Pink", question: "Pembe", example: "The dress is pink.", exampleTR: "Elbise pembedir." },
                    { answer: "Brown", pronunciation: "Brawn", question: "Kahverengi", example: "My eyes are brown.", exampleTR: "Gözlerim kahverengidir." }
                ]
            },
            {
                name: "Animals",
                pool: [
                    { answer: "Cat", pronunciation: "Ket", question: "Kedi", example: "The cat is sleeping on the sofa.", exampleTR: "Kedi kanepede uyuyor." },
                    { answer: "Dog", pronunciation: "Dog", question: "Köpek", example: "My dog loves to play.", exampleTR: "Köpeğim oynamayı sever." },
                    { answer: "Bird", pronunciation: "Börd", question: "Kuş", example: "The bird is singing.", exampleTR: "Kuş ötüyor." },
                    { answer: "Fish", pronunciation: "Fiş", question: "Balık", example: "Fish live in water.", exampleTR: "Balıklar suda yaşar." },
                    { answer: "Horse", pronunciation: "Hors", question: "At", example: "I can ride a horse.", exampleTR: "Ata binebilirim." },
                    { answer: "Cow", pronunciation: "Kaw", question: "İnek", example: "Cows give us milk.", exampleTR: "İnekler bize süt verir." },
                    { answer: "Sheep", pronunciation: "Şip", question: "Koyun", example: "Sheep have white wool.", exampleTR: "Koyunların beyaz yünü vardır." },
                    { answer: "Lion", pronunciation: "Layın", question: "Aslan", example: "The lion is the king of the jungle.", exampleTR: "Aslan ormanın kralıdır." },
                    { answer: "Monkey", pronunciation: "Manki", question: "Maymun", example: "Monkeys like bananas.", exampleTR: "Maymunlar muz sever." },
                    { answer: "Elephant", pronunciation: "Elıfınt", question: "Fil", example: "The elephant is very big.", exampleTR: "Fil çok büyüktür." }
                ]
            },
            {
                name: "Food",
                pool: [
                    { answer: "Apple", pronunciation: "Epıl", question: "Elma", example: "I eat an apple every day.", exampleTR: "Her gün bir elma yerim." },
                    { answer: "Banana", pronunciation: "Bınana", question: "Muz", example: "Bananas are yellow.", exampleTR: "Muzlar sarıdır." },
                    { answer: "Bread", pronunciation: "Bred", question: "Ekmek", example: "We need to buy bread.", exampleTR: "Ekmek almamız lazım." },
                    { answer: "Water", pronunciation: "Wotır", question: "Su", example: "Please give me some water.", exampleTR: "Lütfen bana biraz su ver." },
                    { answer: "Milk", pronunciation: "Milk", question: "Süt", example: "I drink milk for breakfast.", exampleTR: "Kahvaltıda süt içerim." },
                    { answer: "Egg", pronunciation: "Eg", question: "Yumurta", example: "I like boiled eggs.", exampleTR: "Haşlanmış yumurta severim." },
                    { answer: "Cheese", pronunciation: "Çiz", question: "Peynir", example: "This cheese is delicious.", exampleTR: "Bu peynir lezzetli." },
                    { answer: "Chicken", pronunciation: "Çikın", question: "Tavuk", example: "We are having chicken for dinner.", exampleTR: "Akşam yemeğinde tavuk yiyoruz." },
                    { answer: "Rice", pronunciation: "Rays", question: "Pirinç", example: "Rice is popular in Asia.", exampleTR: "Pirinç Asya'da popülerdir." },
                    { answer: "Cake", pronunciation: "Keyk", question: "Kek", example: "Happy birthday! Here is your cake.", exampleTR: "Doğum günün kutlu olsun! İşte pastan." }
                ]
            },
            {
                name: "Home",
                pool: [
                    { answer: "House", pronunciation: "Haus", question: "Ev", example: "My house is big.", exampleTR: "Evim büyüktür." },
                    { answer: "Room", pronunciation: "Rum", question: "Oda", example: "This room is very clean.", exampleTR: "Bu oda çok temiz." },
                    { answer: "Door", pronunciation: "Dor", question: "Kapı", example: "Please close the door.", exampleTR: "Lütfen kapıyı kapat." },
                    { answer: "Window", pronunciation: "Windo", question: "Pencere", example: "Open the window, please.", exampleTR: "Pencereyi aç lütfen." },
                    { answer: "Table", pronunciation: "Teybıl", question: "Masa", example: "The book is on the table.", exampleTR: "Kitap masanın üzerinde." },
                    { answer: "Chair", pronunciation: "Çer", question: "Sandalye", example: "Sit on this chair.", exampleTR: "Bu sandalyeye otur." },
                    { answer: "Bed", pronunciation: "Bed", question: "Yatak", example: "I go to bed at 10 PM.", exampleTR: "Saat 10'da yatağa giderim." },
                    { answer: "Kitchen", pronunciation: "Kiçın", question: "Mutfak", example: "My mom is in the kitchen.", exampleTR: "Annem mutfakta." },
                    { answer: "Garden", pronunciation: "Gardın", question: "Bahçe", example: "We have a beautiful garden.", exampleTR: "Güzel bir bahçemiz var." },
                    { answer: "Key", pronunciation: "Ki", question: "Anahtar", example: "I lost my key.", exampleTR: "Anahtarımı kaybettim." }
                ]
            },
            {
                name: "Clothes",
                pool: [
                    { answer: "Shirt", pronunciation: "Şört", question: "Gömlek", example: "I like your blue shirt.", exampleTR: "Mavi gömleğini beğendim." },
                    { answer: "Shoes", pronunciation: "Şuz", question: "Ayakkabı", example: "These shoes are comfortable.", exampleTR: "Bu ayakkabılar rahat." },
                    { answer: "Dress", pronunciation: "Dres", question: "Elbise", example: "She is wearing a red dress.", exampleTR: "O kırmızı bir elbise giyiyor." },
                    { answer: "Hat", pronunciation: "Het", question: "Şapka", example: "Put on your hat.", exampleTR: "Şapkanı tak." },
                    { answer: "Coat", pronunciation: "Kot", question: "Mont", example: "It is cold, wear a coat.", exampleTR: "Hava soğuk, mont giy." },
                    { answer: "Pants", pronunciation: "Pents", question: "Pantolon", example: "I need new pants.", exampleTR: "Yeni pantolona ihtiyacım var." },
                    { answer: "Skirt", pronunciation: "Skört", question: "Etek", example: "The skirt is too short.", exampleTR: "Etek çok kısa." },
                    { answer: "Socks", pronunciation: "Saks", question: "Çorap", example: "Where are my socks?", exampleTR: "Çoraplarım nerede?" },
                    { answer: "Jacket", pronunciation: "Cekıt", question: "Ceket", example: "Take your jacket.", exampleTR: "Ceketini al." },
                    { answer: "Boots", pronunciation: "Buts", question: "Bot", example: "I wear boots in winter.", exampleTR: "Kışın bot giyerim." }
                ]
            },
            {
                name: "Body",
                pool: [
                    { answer: "Head", pronunciation: "Hed", question: "Baş", example: "My head hurts.", exampleTR: "Başım ağrıyor." },
                    { answer: "Eye", pronunciation: "Ay", question: "Göz", example: "Close your eyes.", exampleTR: "Gözlerini kapat." },
                    { answer: "Ear", pronunciation: "İır", question: "Kulak", example: "I have two ears.", exampleTR: "İki kulağım var." },
                    { answer: "Nose", pronunciation: "Noz", question: "Burun", example: "Touch your nose.", exampleTR: "Burnuna dokun." },
                    { answer: "Mouth", pronunciation: "Mauth", question: "Ağız", example: "Open your mouth.", exampleTR: "Ağzını aç." },
                    { answer: "Hand", pronunciation: "Hend", question: "El", example: "Wash your hands.", exampleTR: "Ellerini yıka." },
                    { answer: "Foot", pronunciation: "Fut", question: "Ayak", example: "My foot is big.", exampleTR: "Ayağım büyük." },
                    { answer: "Arm", pronunciation: "Arm", question: "Kol", example: "He broke his arm.", exampleTR: "Kolunu kırdı." },
                    { answer: "Leg", pronunciation: "Leg", question: "Bacak", example: "My legs are tired.", exampleTR: "Bacaklarım yorgun." },
                    { answer: "Hair", pronunciation: "Heyr", question: "Saç", example: "She has long hair.", exampleTR: "Onun uzun saçları var." }
                ]
            },
            {
                name: "Time",
                pool: [
                    { answer: "Day", pronunciation: "Dey", question: "Gün", example: "Have a nice day.", exampleTR: "İyi günler." },
                    { answer: "Night", pronunciation: "Nayt", question: "Gece", example: "Good night.", exampleTR: "İyi geceler." },
                    { answer: "Week", pronunciation: "Wik", question: "Hafta", example: "I will see you next week.", exampleTR: "Haftaya görüşürüz." },
                    { answer: "Month", pronunciation: "Manth", question: "Ay", example: "This month is June.", exampleTR: "Bu ay Haziran." },
                    { answer: "Year", pronunciation: "Yir", question: "Yıl", example: "Happy new year!", exampleTR: "Mutlu yıllar!" },
                    { answer: "Hour", pronunciation: "Aur", question: "Saat (Süre)", example: "I waited for one hour.", exampleTR: "Bir saat bekledim." },
                    { answer: "Minute", pronunciation: "Minıt", question: "Dakika", example: "Wait a minute.", exampleTR: "Bir dakika bekle." },
                    { answer: "Morning", pronunciation: "Morning", question: "Sabah", example: "Good morning.", exampleTR: "Günaydın." },
                    { answer: "Evening", pronunciation: "Ivning", question: "Akşam", example: "See you in the evening.", exampleTR: "Akşam görüşürüz." },
                    { answer: "Today", pronunciation: "Tudey", question: "Bugün", example: "Today is Monday.", exampleTR: "Bugün Pazartesi." }
                ]
            },
            {
                name: "Jobs",
                pool: [
                    { answer: "Doctor", pronunciation: "Daktır", question: "Doktor", example: "The doctor helped me.", exampleTR: "Doktor bana yardım etti." },
                    { answer: "Teacher", pronunciation: "Tiçır", question: "Öğretmen", example: "My teacher is very kind.", exampleTR: "Öğretmenim çok nazik." },
                    { answer: "Student", pronunciation: "Sityudınt", question: "Öğrenci", example: "I am a student.", exampleTR: "Ben bir öğrenciyim." },
                    { answer: "Driver", pronunciation: "Drayvır", question: "Şoför", example: "The bus driver is fast.", exampleTR: "Otobüs şoförü hızlı." },
                    { answer: "Cook", pronunciation: "Kuk", question: "Aşçı", example: "He is a good cook.", exampleTR: "O iyi bir aşçı." },
                    { answer: "Farmer", pronunciation: "Farmır", question: "Çiftçi", example: "The farmer has cows.", exampleTR: "Çiftçinin inekleri var." },
                    { answer: "Nurse", pronunciation: "Nörs", question: "Hemşire", example: "The nurse is working.", exampleTR: "Hemşire çalışıyor." },
                    { answer: "Worker", pronunciation: "Vörkır", question: "İşçi", example: "The worker is tired.", exampleTR: "İşçi yorgun." },
                    { answer: "Police", pronunciation: "Polis", question: "Polis", example: "Call the police!", exampleTR: "Polisi ara!" },
                    { answer: "Artist", pronunciation: "Artist", question: "Sanatçı", example: "She is a great artist.", exampleTR: "O harika bir sanatçı." }
                ]
            },
            {
                name: "Transport",
                pool: [
                    { answer: "Car", pronunciation: "Kar", question: "Araba", example: "My car is red.", exampleTR: "Arabam kırmızı." },
                    { answer: "Bus", pronunciation: "Bas", question: "Otobüs", example: "I take the bus to school.", exampleTR: "Okula otobüsle giderim." },
                    { answer: "Train", pronunciation: "Treyn", question: "Tren", example: "The train is coming.", exampleTR: "Tren geliyor." },
                    { answer: "Plane", pronunciation: "Pleyn", question: "Uçak", example: "The plane is flying high.", exampleTR: "Uçak yüksekten uçuyor." },
                    { answer: "Bike", pronunciation: "Bayk", question: "Bisiklet", example: "I ride my bike every day.", exampleTR: "Her gün bisiklet sürerim." },
                    { answer: "Taxi", pronunciation: "Taksi", question: "Taksi", example: "We need a taxi.", exampleTR: "Bir taksiye ihtiyacımız var." },
                    { answer: "Ship", pronunciation: "Şip", question: "Gemi", example: "The ship is big.", exampleTR: "Gemi büyük." },
                    { answer: "Boat", pronunciation: "Bot", question: "Tekne", example: "We went fishing on a boat.", exampleTR: "Tekneyle balık tutmaya gittik." },
                    { answer: "Road", pronunciation: "Rod", question: "Yol", example: "The road is long.", exampleTR: "Yol uzun." },
                    { answer: "Ticket", pronunciation: "Tikıt", question: "Bilet", example: "I have a ticket.", exampleTR: "Biletin var." }
                ]
            },
            {
                name: "Weather",
                pool: [
                    { answer: "Sun", pronunciation: "San", question: "Güneş", example: "The sun is hot.", exampleTR: "Güneş sıcak." },
                    { answer: "Rain", pronunciation: "Reyn", question: "Yağmur", example: "I like the rain.", exampleTR: "Yağmuru severim." },
                    { answer: "Snow", pronunciation: "Sno", question: "Kar", example: "Do you like snow?", exampleTR: "Karı sever misin?" },
                    { answer: "Wind", pronunciation: "Vind", question: "Rüzgar", example: "The wind is strong.", exampleTR: "Rüzgar güçlü." },
                    { answer: "Cloud", pronunciation: "Klaud", question: "Bulut", example: "Look at that white cloud.", exampleTR: "Şu beyaz buluta bak." },
                    { answer: "Hot", pronunciation: "Hat", question: "Sıcak", example: "It is very hot today.", exampleTR: "Bugün hava çok sıcak." },
                    { answer: "Cold", pronunciation: "Kold", question: "Soğuk", example: "Winter is cold.", exampleTR: "Kış soğuktur." },
                    { answer: "Storm", pronunciation: "Storm", question: "Fırtına", example: "There is a storm coming.", exampleTR: "Fırtına geliyor." },
                    { answer: "Sky", pronunciation: "Skay", question: "Gökyüzü", example: "The sky is blue.", exampleTR: "Gökyüzü mavi." },
                    { answer: "Ice", pronunciation: "Ays", question: "Buz", example: "The water turned to ice.", exampleTR: "Su buza dönüştü." }
                ]
            }
        ],
        A2: [
            {
                name: "Daily Routine",
                pool: [
                    { answer: "Wake up", pronunciation: "Weyk ap", question: "Uyanmak", example: "I wake up at 7 AM.", exampleTR: "Sabah 7'de uyanırım." },
                    { answer: "Breakfast", pronunciation: "Brekfıst", question: "Kahvaltı", example: "I eat eggs for breakfast.", exampleTR: "Kahvaltıda yumurta yerim." },
                    { answer: "Shower", pronunciation: "Şawır", question: "Duş", example: "I take a shower every morning.", exampleTR: "Her sabah duş alırım." },
                    { answer: "Work", pronunciation: "Wörk", question: "Çalışmak", example: "I go to work by bus.", exampleTR: "İşe otobüsle giderim." },
                    { answer: "School", pronunciation: "Skul", question: "Okul", example: "School starts at 8 AM.", exampleTR: "Okul sabah 8'de başlar." },
                    { answer: "Lunch", pronunciation: "Lanç", question: "Öğle yemeği", example: "We have lunch at noon.", exampleTR: "Öğlen öğle yemeği yeriz." },
                    { answer: "Dinner", pronunciation: "Dinır", question: "Akşam yemeği", example: "Dinner is ready.", exampleTR: "Akşam yemeği hazır." },
                    { answer: "Sleep", pronunciation: "Slip", question: "Uyumak", example: "I sleep 8 hours a day.", exampleTR: "Günde 8 saat uyurum." },
                    { answer: "Brush", pronunciation: "Braş", question: "Fırçalamak", example: "Brush your teeth.", exampleTR: "Dişlerini fırçala." },
                    { answer: "Dress", pronunciation: "Dres", question: "Giyinmek", example: "I dress quickly.", exampleTR: "Hızlıca giyinirim." }
                ]
            },
            {
                name: "Clothes",
                pool: [
                    { answer: "Shirt", pronunciation: "Şört", question: "Gömlek", example: "He is wearing a white shirt.", exampleTR: "O beyaz bir gömlek giyiyor." },
                    { answer: "Shoes", pronunciation: "Şuz", question: "Ayakkabı", example: "My shoes are dirty.", exampleTR: "Ayakkabılarım kirli." },
                    { answer: "Dress", pronunciation: "Dres", question: "Elbise", example: "She bought a new dress.", exampleTR: "Yeni bir elbise aldı." },
                    { answer: "Hat", pronunciation: "Het", question: "Şapka", example: "The hat protects you from the sun.", exampleTR: "Şapka seni güneşten korur." },
                    { answer: "Coat", pronunciation: "Kot", question: "Mont", example: "Put on your coat, it's cold.", exampleTR: "Montunu giy, hava soğuk." },
                    { answer: "Pants", pronunciation: "Pents", question: "Pantolon", example: "These pants are too tight.", exampleTR: "Bu pantolon çok dar." },
                    { answer: "Skirt", pronunciation: "Skört", question: "Etek", example: "She likes wearing skirts.", exampleTR: "Etek giymeyi sever." },
                    { answer: "Socks", pronunciation: "Saks", question: "Çorap", example: "I need warm socks.", exampleTR: "Sıcak tutan çoraplara ihtiyacım var." },
                    { answer: "Jacket", pronunciation: "Cekıt", question: "Ceket", example: "Your jacket is cool.", exampleTR: "Ceketin havalı." },
                    { answer: "Boots", pronunciation: "Buts", question: "Bot", example: "These boots are for hiking.", exampleTR: "Bu botlar yürüyüş için." }
                ]
            },
            {
                name: "Weather",
                pool: [
                    { answer: "Sunny", pronunciation: "Sani", question: "Güneşli", example: "It is sunny today.", exampleTR: "Bugün hava güneşli." },
                    { answer: "Rainy", pronunciation: "Reyni", question: "Yağmurlu", example: "It was a rainy day.", exampleTR: "Yağmurlu bir gündü." },
                    { answer: "Cloudy", pronunciation: "Klaudi", question: "Bulutlu", example: "The sky is cloudy.", exampleTR: "Gökyüzü bulutlu." },
                    { answer: "Snowy", pronunciation: "Snowi", question: "Karlı", example: "It is snowy in the mountains.", exampleTR: "Dağlarda hava karlı." },
                    { answer: "Windy", pronunciation: "Windi", question: "Rüzgarlı", example: "It is very windy outside.", exampleTR: "Dışarısı çok rüzgarlı." },
                    { answer: "Hot", pronunciation: "Hat", question: "Sıcak", example: "Summer is hot.", exampleTR: "Yaz mevsimi sıcaktır." },
                    { answer: "Cold", pronunciation: "Kold", question: "Soğuk", example: "I feel cold.", exampleTR: "Üşüyorum." },
                    { answer: "Storm", pronunciation: "Storm", question: "Fırtına", example: "The storm destroyed the house.", exampleTR: "Fırtına evi yıktı." },
                    { answer: "Foggy", pronunciation: "Fogi", question: "Sisli", example: "Be careful, it is foggy.", exampleTR: "Dikkatli ol, hava sisli." },
                    { answer: "Warm", pronunciation: "Worm", question: "Ilık", example: "The water is warm.", exampleTR: "Su ılık." }
                ]
            },
            {
                name: "Jobs",
                pool: [
                    { answer: "Doctor", pronunciation: "Daktır", question: "Doktor", example: "The doctor is in the hospital.", exampleTR: "Doktor hastanede." },
                    { answer: "Teacher", pronunciation: "Tiçır", question: "Öğretmen", example: "The teacher explains the lesson.", exampleTR: "Öğretmen dersi anlatıyor." },
                    { answer: "Driver", pronunciation: "Drayvır", question: "Şoför", example: "My father is a driver.", exampleTR: "Babam şoför." },
                    { answer: "Cook", pronunciation: "Kuk", question: "Aşçı", example: "The cook makes delicious food.", exampleTR: "Aşçı lezzetli yemekler yapar." },
                    { answer: "Nurse", pronunciation: "Nörs", question: "Hemşire", example: "The nurse helps the patients.", exampleTR: "Hemşire hastalara yardım eder." },
                    { answer: "Farmer", pronunciation: "Farmır", question: "Çiftçi", example: "The farmer grows vegetables.", exampleTR: "Çiftçi sebze yetiştirir." },
                    { answer: "Artist", pronunciation: "Artist", question: "Sanatçı", example: "The artist paints a picture.", exampleTR: "Sanatçı resim yapıyor." },
                    { answer: "Pilot", pronunciation: "Paylıt", question: "Pilot", example: "The pilot flies the plane.", exampleTR: "Pilot uçağı uçurur." },
                    { answer: "Actor", pronunciation: "Ektır", question: "Oyuncu", example: "He is a famous actor.", exampleTR: "O ünlü bir oyuncu." },
                    { answer: "Worker", pronunciation: "Wörkır", question: "İşçi", example: "The worker builds houses.", exampleTR: "İşçi evler inşa eder." }
                ]
            },
            {
                name: "Places",
                pool: [
                    { answer: "Park", pronunciation: "Park", question: "Park", example: "Let's go to the park.", exampleTR: "Hadi parka gidelim." },
                    { answer: "Hospital", pronunciation: "Haspıtıl", question: "Hastane", example: "She works at the hospital.", exampleTR: "O hastanede çalışıyor." },
                    { answer: "Bank", pronunciation: "Benk", question: "Banka", example: "I need to go to the bank.", exampleTR: "Bankaya gitmem lazım." },
                    { answer: "Market", pronunciation: "Markıt", question: "Market", example: "The market is open.", exampleTR: "Market açık." },
                    { answer: "Cinema", pronunciation: "Sinıma", question: "Sinema", example: "We watched a movie at the cinema.", exampleTR: "Sinemada film izledik." },
                    { answer: "Library", pronunciation: "Laybrıri", question: "Kütüphane", example: "Quiet please, this is a library.", exampleTR: "Sessiz olun lütfen, burası kütüphane." },
                    { answer: "Street", pronunciation: "Strit", question: "Cadde/Sokak", example: "Don't play on the street.", exampleTR: "Caddede oynama." },
                    { answer: "Bridge", pronunciation: "Bric", question: "Köprü", example: "We crossed the bridge.", exampleTR: "Köprüyü geçtik." },
                    { answer: "Beach", pronunciation: "Biç", question: "Plaj", example: "The beach is beautiful.", exampleTR: "Plaj çok güzel." },
                    { answer: "Farm", pronunciation: "Farm", question: "Çiftlik", example: "Animals live on the farm.", exampleTR: "Hayvanlar çiftlikte yaşar." }
                ]
            },
            {
                name: "Transport",
                pool: [
                    { answer: "Car", pronunciation: "Kar", question: "Araba", example: "He drives a fast car.", exampleTR: "O hızlı bir araba kullanır." },
                    { answer: "Bus", pronunciation: "Bas", question: "Otobüs", example: "The bus is late.", exampleTR: "Otobüs gecikti." },
                    { answer: "Train", pronunciation: "Treyn", question: "Tren", example: "I prefer traveling by train.", exampleTR: "Trenle seyahat etmeyi tercih ederim." },
                    { answer: "Plane", pronunciation: "Pleyn", question: "Uçak", example: "The plane landed safely.", exampleTR: "Uçak güvenli bir şekilde indi." },
                    { answer: "Bike", pronunciation: "Bayk", question: "Bisiklet", example: "Can you ride a bike?", exampleTR: "Bisiklet sürebilir misin?" },
                    { answer: "Ship", pronunciation: "Şip", question: "Gemi", example: "The ship sails on the sea.", exampleTR: "Gemi denizde yüzer." },
                    { answer: "Taxi", pronunciation: "Taksi", question: "Taksi", example: "Call a taxi for me.", exampleTR: "Benim için bir taksi çağır." },
                    { answer: "Truck", pronunciation: "Trak", question: "Kamyon", example: "The truck carries goods.", exampleTR: "Kamyon mal taşır." },
                    { answer: "Boat", pronunciation: "Bot", question: "Tekne", example: "We rented a small boat.", exampleTR: "Küçük bir tekne kiraladık." },
                    { answer: "Metro", pronunciation: "Metro", question: "Metro", example: "The metro is very fast.", exampleTR: "Metro çok hızlıdır." }
                ]
            }
        ],
        B1: [
            {
                name: "Travel",
                pool: [
                    { answer: "Luggage", pronunciation: "Lagıç", question: "Bagaj", example: "I lost my luggage.", exampleTR: "Bagajımı kaybettim." },
                    { answer: "Passport", pronunciation: "Pasport", question: "Pasaport", example: "Show me your passport.", exampleTR: "Pasaportunu göster." },
                    { answer: "Ticket", pronunciation: "Tikit", question: "Bilet", example: "I booked a ticket online.", exampleTR: "İnternetten bilet aldım." },
                    { answer: "Airport", pronunciation: "Eyrport", question: "Havalimanı", example: "We arrived at the airport.", exampleTR: "Havalimanına vardık." },
                    { answer: "Passenger", pronunciation: "Pesıncır", question: "Yolcu", example: "The passenger is sleeping.", exampleTR: "Yolcu uyuyor." },
                    { answer: "Arrival", pronunciation: "Erayvıl", question: "Varış", example: "The arrival time is 5 PM.", exampleTR: "Varış saati akşam 5." },
                    { answer: "Departure", pronunciation: "Diparçır", question: "Kalkış", example: "The departure was delayed.", exampleTR: "Kalkış gecikti." },
                    { answer: "Customs", pronunciation: "Kastıms", question: "Gümrük", example: "We went through customs.", exampleTR: "Gümrükten geçtik." },
                    { answer: "Delay", pronunciation: "Diley", question: "Gecikme", example: "Sorry for the delay.", exampleTR: "Gecikme için özür dilerim." },
                    { answer: "Booking", pronunciation: "Buking", question: "Rezervasyon", example: "I have a hotel booking.", exampleTR: "Otel rezervasyonum var." }
                ]
            },
            {
                name: "Health",
                pool: [
                    { answer: "Medicine", pronunciation: "Medısın", question: "İlaç", example: "Take this medicine daily.", exampleTR: "Bu ilacı her gün al." },
                    { answer: "Doctor", pronunciation: "Daktır", question: "Doktor", example: "See a doctor if you feel sick.", exampleTR: "Hasta hissedersen doktora görün." },
                    { answer: "Pain", pronunciation: "Peyn", question: "Ağrı", example: "I have a pain in my back.", exampleTR: "Sırtımda ağrı var." },
                    { answer: "Flu", pronunciation: "Flu", question: "Grip", example: "He caught the flu.", exampleTR: "Gripe yakalandı." },
                    { answer: "Fever", pronunciation: "Fivır", question: "Ateş", example: "She has a high fever.", exampleTR: "Yüksek ateşi var." },
                    { answer: "Cough", pronunciation: "Kof", question: "Öksürük", example: "That is a bad cough.", exampleTR: "Bu kötü bir öksürük." },
                    { answer: "Healthy", pronunciation: "Helthi", question: "Sağlıklı", example: "Eat healthy food.", exampleTR: "Sağlıklı yiyecekler ye." },
                    { answer: "Sick", pronunciation: "Sik", question: "Hasta", example: "I feel sick today.", exampleTR: "Bugün hasta hissediyorum." },
                    { answer: "Emergency", pronunciation: "İmörcınsi", question: "Acil Durum", example: "Call 911 in an emergency.", exampleTR: "Acil durumda 911'i ara." },
                    { answer: "Diet", pronunciation: "Dayıt", question: "Diyet", example: "She is on a diet.", exampleTR: "O diyette." }
                ]
            },
            {
                name: "Education",
                pool: [
                    { answer: "Degree", pronunciation: "Digri", question: "Derece/Diploma", example: "He has a degree in law.", exampleTR: "Hukuk diploması var." },
                    { answer: "Exam", pronunciation: "Igzam", question: "Sınav", example: "The exam was hard.", exampleTR: "Sınav zordu." },
                    { answer: "Lesson", pronunciation: "Lesın", question: "Ders", example: "The lesson starts now.", exampleTR: "Ders şimdi başlıyor." },
                    { answer: "Subject", pronunciation: "Sabcıkt", question: "Konu/Ders", example: "Math is my favorite subject.", exampleTR: "Matematik en sevdiğim derstir." },
                    { answer: "Grade", pronunciation: "Greyd", question: "Not/Sınıf", example: "I got a good grade.", exampleTR: "İyi bir not aldım." },
                    { answer: "Homework", pronunciation: "Homwörk", question: "Ödev", example: "Finish your homework.", exampleTR: "Ödevini bitir." },
                    { answer: "Library", pronunciation: "Laybrıri", question: "Kütüphane", example: "I study in the library.", exampleTR: "Kütüphanede çalışırım." },
                    { answer: "University", pronunciation: "Yünivörsiti", question: "Üniversite", example: "She goes to university.", exampleTR: "O üniversiteye gidiyor." },
                    { answer: "Teacher", pronunciation: "Tiçır", question: "Öğretmen", example: "Listen to your teacher.", exampleTR: "Öğretmenini dinle." },
                    { answer: "Student", pronunciation: "Sityudınt", question: "Öğrenci", example: "Every student must learn.", exampleTR: "Her öğrenci öğrenmelidir." }
                ]
            },
            {
                name: "Environment",
                pool: [
                    { answer: "Nature", pronunciation: "Neyçır", question: "Doğa", example: "We must protect nature.", exampleTR: "Doğayı korumalıyız." },
                    { answer: "Pollution", pronunciation: "Poluşın", question: "Kirlilik", example: "Air pollution is a problem.", exampleTR: "Hava kirliliği bir sorundur." },
                    { answer: "Recycle", pronunciation: "Risaykıl", question: "Geri Dönüşüm", example: "Please recycle plastic.", exampleTR: "Lütfen plastiği geri dönüştürün." },
                    { answer: "Climate", pronunciation: "Klaymıt", question: "İklim", example: "The climate is changing.", exampleTR: "İklim değişiyor." },
                    { answer: "Global", pronunciation: "Globıl", question: "Küresel", example: "Global warming is real.", exampleTR: "Küresel ısınma gerçektir." },
                    { answer: "Energy", pronunciation: "Enırci", question: "Enerji", example: "Save energy.", exampleTR: "Enerji tasarrufu yap." },
                    { answer: "Waste", pronunciation: "Weyst", question: "Atık/İsraf", example: "Do not waste water.", exampleTR: "Suyu israf etme." },
                    { answer: "Forest", pronunciation: "Forıst", question: "Orman", example: "The forest is green.", exampleTR: "Orman yeşildir." },
                    { answer: "Ocean", pronunciation: "Oşın", question: "Okyanus", example: "The ocean is deep.", exampleTR: "Okyanus derindir." },
                    { answer: "Planet", pronunciation: "Plenıt", question: "Gezegen", example: "Earth is our planet.", exampleTR: "Dünya bizim gezegenimizdir." }
                ]
            },
            {
                name: "Technology",
                pool: [
                    { answer: "Computer", pronunciation: "Kımpyutır", question: "Bilgisayar", example: "I use a computer for work.", exampleTR: "İş için bilgisayar kullanırım." },
                    { answer: "Software", pronunciation: "Softweyr", question: "Yazılım", example: "This software is new.", exampleTR: "Bu yazılım yeni." },
                    { answer: "Internet", pronunciation: "İntırnet", question: "İnternet", example: "The internet is fast.", exampleTR: "İnternet hızlı." },
                    { answer: "Website", pronunciation: "Websayt", question: "Web Sitesi", example: "Visit our website.", exampleTR: "Web sitemizi ziyaret edin." },
                    { answer: "Device", pronunciation: "Divays", question: "Cihaz", example: "Turn off your device.", exampleTR: "Cihazını kapat." },
                    { answer: "Screen", pronunciation: "Skrin", question: "Ekran", example: "The screen is broken.", exampleTR: "Ekran kırık." },
                    { answer: "Data", pronunciation: "Deyta", question: "Veri", example: "Save your data.", exampleTR: "Verilerini kaydet." },
                    { answer: "Network", pronunciation: "Netwörk", question: "Ağ", example: "The network is down.", exampleTR: "Ağ çöktü." },
                    { answer: "Digital", pronunciation: "Dicıtıl", question: "Dijital", example: "We live in a digital age.", exampleTR: "Dijital bir çağda yaşıyoruz." },
                    { answer: "App", pronunciation: "Ep", question: "Uygulama", example: "Download this app.", exampleTR: "Bu uygulamayı indir." }
                ]
            },
            {
                name: "Culture",
                pool: [
                    { answer: "Art", pronunciation: "Art", question: "Sanat", example: "She loves modern art.", exampleTR: "Modern sanatı sever." },
                    { answer: "Music", pronunciation: "Müzik", question: "Müzik", example: "Music makes me happy.", exampleTR: "Müzik beni mutlu eder." },
                    { answer: "History", pronunciation: "Histıri", question: "Tarih", example: "History is interesting.", exampleTR: "Tarih ilginçtir." },
                    { answer: "Tradition", pronunciation: "Trıdişın", question: "Gelenek", example: "It is a family tradition.", exampleTR: "Bu bir aile geleneğidir." },
                    { answer: "Language", pronunciation: "Lengwiç", question: "Dil", example: "Learning a language is fun.", exampleTR: "Dil öğrenmek eğlencelidir." },
                    { answer: "Festival", pronunciation: "Festivıl", question: "Festival", example: "We went to a music festival.", exampleTR: "Bir müzik festivaline gittik." },
                    { answer: "Museum", pronunciation: "Müziyım", question: "Müze", example: "The museum is closed.", exampleTR: "Müze kapalı." },
                    { answer: "Literature", pronunciation: "Litıraçır", question: "Edebiyat", example: "He studies literature.", exampleTR: "Edebiyat okuyor." },
                    { answer: "Custom", pronunciation: "Kastım", question: "Adet/Gelenek", example: "It is a local custom.", exampleTR: "Bu yerel bir adettir." },
                    { answer: "Religion", pronunciation: "Rilicın", question: "Din", example: "Respect every religion.", exampleTR: "Her dine saygı duy." }
                ]
            }
        ],
        B2: [
            {
                name: "Environment",
                pool: [
                    { answer: "Pollution", pronunciation: "Poluşın", question: "Kirlilik", example: "Pollution harms the environment.", exampleTR: "Kirlilik çevreye zarar verir." },
                    { answer: "Climate", pronunciation: "Klaymıt", question: "İklim", example: "The climate is changing rapidly.", exampleTR: "İklim hızla değişiyor." },
                    { answer: "Recycle", pronunciation: "Risaykıl", question: "Geri dönüşüm", example: "We should recycle paper and plastic.", exampleTR: "Kağıt ve plastiği geri dönüştürmeliyiz." },
                    { answer: "Global Warming", pronunciation: "Globıl Worming", question: "Küresel Isınma", example: "Global warming causes melting ice.", exampleTR: "Küresel ısınma buzların erimesine neden olur." },
                    { answer: "Energy", pronunciation: "Enırci", question: "Enerji", example: "Solar energy is clean.", exampleTR: "Güneş enerjisi temizdir." },
                    { answer: "Protect", pronunciation: "Protekt", question: "Korumak", example: "We must protect wildlife.", exampleTR: "Vahşi yaşamı korumalıyız." },
                    { answer: "Waste", pronunciation: "Weyst", question: "Atık", example: "Do not throw waste in the river.", exampleTR: "Nehre atık atmayın." },
                    { answer: "Nature", pronunciation: "Neyçır", question: "Doğa", example: "I love spending time in nature.", exampleTR: "Doğada vakit geçirmeyi severim." },
                    { answer: "Species", pronunciation: "Spişiz", question: "Türler", example: "Some species are in danger.", exampleTR: "Bazı türler tehlikede." },
                    { answer: "Damage", pronunciation: "Demıc", question: "Hasar", example: "The storm caused a lot of damage.", exampleTR: "Fırtına çok hasara neden oldu." }
                ]
            },
            {
                name: "Media",
                pool: [
                    { answer: "News", pronunciation: "Nyuz", question: "Haberler", example: "I watch the news every evening.", exampleTR: "Her akşam haberleri izlerim." },
                    { answer: "Article", pronunciation: "Artıkıl", question: "Makale", example: "I read an interesting article.", exampleTR: "İlginç bir makale okudum." },
                    { answer: "Social Media", pronunciation: "Soşıl Midya", question: "Sosyal Medya", example: "Social media connects people.", exampleTR: "Sosyal medya insanları birbirine bağlar." },
                    { answer: "Broadcast", pronunciation: "Brodkest", question: "Yayın", example: "The match will be broadcast live.", exampleTR: "Maç canlı yayınlanacak." },
                    { answer: "News", pronunciation: "Nyuz", question: "Haberler", example: "Did you watch the news?", exampleTR: "Haberleri izledin mi?" },
                    { answer: "Article", pronunciation: "Artıkıl", question: "Makale", example: "Read this article.", exampleTR: "Bu makaleyi oku." },
                    { answer: "Social Media", pronunciation: "Soşıl Midya", question: "Sosyal Medya", example: "Social media is popular.", exampleTR: "Sosyal medya popülerdir." },
                    { answer: "Broadcast", pronunciation: "Brodkest", question: "Yayın", example: "The broadcast starts at 8.", exampleTR: "Yayın 8'de başlıyor." },
                    { answer: "Journalist", pronunciation: "Cörnılist", question: "Gazeteci", example: "The journalist wrote a report.", exampleTR: "Gazeteci bir rapor yazdı." },
                    { answer: "Interview", pronunciation: "İntırvyu", question: "Röportaj", example: "She had an interview for the job.", exampleTR: "İş için bir röportajı vardı." },
                    { answer: "Headline", pronunciation: "Hedlayn", question: "Manşet", example: "The headline caught my eye.", exampleTR: "Manşet dikkatimi çekti." },
                    { answer: "Channel", pronunciation: "Çenıl", question: "Kanal", example: "What channel is the game on?", exampleTR: "Maç hangi kanalda?" },
                    { answer: "Audience", pronunciation: "Odiyıns", question: "Seyirci/Kitle", example: "The audience applauded.", exampleTR: "Seyirci alkışladı." },
                    { answer: "Advertisement", pronunciation: "Edvırtayzmınt", question: "Reklam", example: "I saw an advertisement for a new car.", exampleTR: "Yeni bir araba reklamı gördüm." }
                ]
            },
            {
                name: "Business",
                pool: [
                    { answer: "Market", pronunciation: "Markıt", question: "Pazar/Piyasa", example: "The market is growing.", exampleTR: "Piyasa büyüyor." },
                    { answer: "Profit", pronunciation: "Profit", question: "Kâr", example: "We made a good profit.", exampleTR: "İyi bir kâr elde ettik." },
                    { answer: "Loss", pronunciation: "Los", question: "Zarar", example: "The company reported a loss.", exampleTR: "Şirket zarar bildirdi." },
                    { answer: "Strategy", pronunciation: "Strateci", question: "Strateji", example: "We need a new strategy.", exampleTR: "Yeni bir stratejiye ihtiyacımız var." },
                    { answer: "Management", pronunciation: "Menıcmınt", question: "Yönetim", example: "Good management is key.", exampleTR: "İyi yönetim anahtardır." },
                    { answer: "Investment", pronunciation: "İnvestmınt", question: "Yatırım", example: "It is a safe investment.", exampleTR: "Bu güvenli bir yatırım." },
                    { answer: "Budget", pronunciation: "Bacıt", question: "Bütçe", example: "We are over budget.", exampleTR: "Bütçeyi aştık." },
                    { answer: "Client", pronunciation: "Klayınt", question: "Müşteri", example: "The client is happy.", exampleTR: "Müşteri mutlu." },
                    { answer: "Contract", pronunciation: "Kantrekt", question: "Sözleşme", example: "Sign the contract.", exampleTR: "Sözleşmeyi imzala." },
                    { answer: "Meeting", pronunciation: "Miting", question: "Toplantı", example: "The meeting starts at 9.", exampleTR: "Toplantı 9'da başlıyor." }
                ]
            },
            {
                name: "Politics",
                pool: [
                    { answer: "Government", pronunciation: "Gavırnmınt", question: "Hükümet", example: "The government passed a law.", exampleTR: "Hükümet bir yasa geçirdi." },
                    { answer: "Election", pronunciation: "İlekşın", question: "Seçim", example: "The election is next month.", exampleTR: "Seçim gelecek ay." },
                    { answer: "Vote", pronunciation: "Vot", question: "Oy", example: "Every vote counts.", exampleTR: "Her oy sayılır." },
                    { answer: "Policy", pronunciation: "Palısi", question: "Politika", example: "They changed the policy.", exampleTR: "Politikayı değiştirdiler." },
                    { answer: "Leader", pronunciation: "Lidır", question: "Lider", example: "He is a strong leader.", exampleTR: "O güçlü bir lider." },
                    { answer: "Democracy", pronunciation: "Dimakrısi", question: "Demokrasi", example: "We believe in democracy.", exampleTR: "Demokrasiye inanıyoruz." },
                    { answer: "Candidate", pronunciation: "Kendideyt", question: "Aday", example: "Who is the best candidate?", exampleTR: "En iyi aday kim?" },
                    { answer: "Campaign", pronunciation: "Kempeyn", question: "Kampanya", example: "The campaign was successful.", exampleTR: "Kampanya başarılıydı." },
                    { answer: "Citizen", pronunciation: "Sitizın", question: "Vatandaş", example: "She is a US citizen.", exampleTR: "O bir ABD vatandaşı." },
                    { answer: "Rights", pronunciation: "Rayts", question: "Haklar", example: "Human rights are important.", exampleTR: "İnsan hakları önemlidir." }
                ]
            },
            {
                name: "Science",
                pool: [
                    { answer: "Theory", pronunciation: "Thiyori", question: "Teori", example: "It is just a theory.", exampleTR: "Bu sadece bir teori." },
                    { answer: "Experiment", pronunciation: "İksperimınt", question: "Deney", example: "The experiment failed.", exampleTR: "Deney başarısız oldu." },
                    { answer: "Research", pronunciation: "Risörç", question: "Araştırma", example: "More research is needed.", exampleTR: "Daha fazla araştırma gerekli." },
                    { answer: "Evidence", pronunciation: "Evidıns", question: "Kanıt", example: "There is no evidence.", exampleTR: "Hiçbir kanıt yok." },
                    { answer: "Analysis", pronunciation: "Enalısis", question: "Analiz", example: "The analysis is complete.", exampleTR: "Analiz tamamlandı." },
                    { answer: "Method", pronunciation: "Methıd", question: "Yöntem", example: "This is a new method.", exampleTR: "Bu yeni bir yöntem." },
                    { answer: "Result", pronunciation: "Rizalt", question: "Sonuç", example: "The result was good.", exampleTR: "Sonuç iyiydi." },
                    { answer: "Data", pronunciation: "Deyta", question: "Veri", example: "Collect the data.", exampleTR: "Verileri topla." },
                    { answer: "Sample", pronunciation: "Sempıl", question: "Örnek/Numune", example: "Take a blood sample.", exampleTR: "Kan örneği al." },
                    { answer: "Lab", pronunciation: "Leb", question: "Laboratuvar", example: "He works in a lab.", exampleTR: "O bir laboratuvarda çalışıyor." }
                ]
            },
            {
                name: "Media",
                pool: [
                    { answer: "News", pronunciation: "Nyuz", question: "Haber", example: "Did you watch the news?", exampleTR: "Haberleri izledin mi?" },
                    { answer: "Article", pronunciation: "Artıkıl", question: "Makale", example: "Read this article.", exampleTR: "Bu makaleyi oku." },
                    { answer: "Channel", pronunciation: "Çenıl", question: "Kanal", example: "Change the channel.", exampleTR: "Kanalı değiştir." },
                    { answer: "Broadcast", pronunciation: "Brodkest", question: "Yayın", example: "The broadcast starts at 8.", exampleTR: "Yayın 8'de başlıyor." },
                    { answer: "Social", pronunciation: "Soşıl", question: "Sosyal", example: "Social media is popular.", exampleTR: "Sosyal medya popülerdir." },
                    { answer: "Network", pronunciation: "Netwörk", question: "Ağ", example: "Join our network.", exampleTR: "Ağımıza katıl." },
                    { answer: "Online", pronunciation: "Onlayn", question: "Çevrimiçi", example: "I am always online.", exampleTR: "Ben her zaman çevrimiçiyim." },
                    { answer: "Content", pronunciation: "Kantent", question: "İçerik", example: "The content is good.", exampleTR: "İçerik iyi." },
                    { answer: "Source", pronunciation: "Sors", question: "Kaynak", example: "Check your source.", exampleTR: "Kaynağını kontrol et." },
                    { answer: "Report", pronunciation: "Riport", question: "Rapor/Haber", example: "The report is ready.", exampleTR: "Rapor hazır." }
                ]
            },
            {
                name: "Law",
                pool: [
                    { answer: "Court", pronunciation: "Kort", question: "Mahkeme", example: "See you in court.", exampleTR: "Mahkemede görüşürüz." },
                    { answer: "Judge", pronunciation: "Cac", question: "Hakim", example: "The judge decided.", exampleTR: "Hakim karar verdi." },
                    { answer: "Lawyer", pronunciation: "Loyır", question: "Avukat", example: "Call my lawyer.", exampleTR: "Avukatımı ara." },
                    { answer: "Crime", pronunciation: "Kraym", question: "Suç", example: "Crime is rising.", exampleTR: "Suç artıyor." },
                    { answer: "Justice", pronunciation: "Castıs", question: "Adalet", example: "We want justice.", exampleTR: "Adalet istiyoruz." },
                    { answer: "Legal", pronunciation: "Ligıl", question: "Yasal", example: "Is this legal?", exampleTR: "Bu yasal mı?" },
                    { answer: "Rule", pronunciation: "Rul", question: "Kural", example: "Follow the rules.", exampleTR: "Kurallara uy." },
                    { answer: "Case", pronunciation: "Keys", question: "Dava", example: "The case is closed.", exampleTR: "Dava kapandı." },
                    { answer: "Evidence", pronunciation: "Evidıns", question: "Kanıt", example: "We need evidence.", exampleTR: "Kanıta ihtiyacımız var." },
                    { answer: "Guilty", pronunciation: "Gilti", example: "He is guilty.", question: "Suçlu", exampleTR: "O suçlu." }
                ]
            },
            {
                name: "Psychology",
                pool: [
                    { answer: "Mind", pronunciation: "Maynd", question: "Zihin", example: "Open your mind.", exampleTR: "Zihnini aç." },
                    { answer: "Behavior", pronunciation: "Biheyvyır", question: "Davranış", example: "His behavior is strange.", exampleTR: "Davranışları garip." },
                    { answer: "Emotion", pronunciation: "İmoşın", question: "Duygu", example: "Control your emotions.", exampleTR: "Duygularını kontrol et." },
                    { answer: "Stress", pronunciation: "Stres", question: "Stres", example: "I have too much stress.", exampleTR: "Çok fazla stresim var." },
                    { answer: "Memory", pronunciation: "Memıri", question: "Hafıza", example: "I have a bad memory.", exampleTR: "Hafızam kötü." },
                    { answer: "Dream", pronunciation: "Drim", question: "Rüya", example: "I had a bad dream.", exampleTR: "Kötü bir rüya gördüm." },
                    { answer: "Fear", pronunciation: "Fiır", question: "Korku", example: "Face your fear.", exampleTR: "Korkunla yüzleş." },
                    { answer: "Habit", pronunciation: "Hebıt", question: "Alışkanlık", example: "It is a bad habit.", exampleTR: "Bu kötü bir alışkanlık." },
                    { answer: "Mental", pronunciation: "Mentıl", question: "Zihinsel", example: "Mental health is important.", exampleTR: "Zihinsel sağlık önemlidir." },
                    { answer: "Thought", pronunciation: "Thot", question: "Düşünce", example: "That is a good thought.", exampleTR: "Bu iyi bir düşünce." }
                ]
            }
        ],
        C1: [
            {
                name: "Abstract",
                pool: [
                    { answer: "Concept", pronunciation: "Konsept", question: "Kavram", example: "It is a difficult concept.", exampleTR: "Bu zor bir kavram." },
                    { answer: "Perspective", pronunciation: "Pörspektiv", question: "Bakış açısı", example: "From my perspective, it is wrong.", exampleTR: "Benim bakış açıma göre bu yanlış." },
                    { answer: "Assumption", pronunciation: "Esampşın", question: "Varsayım", example: "That is a big assumption.", exampleTR: "Bu büyük bir varsayım." },
                    { answer: "Implication", pronunciation: "İmplikeyşın", question: "İma/Sonuç", example: "What are the implications?", exampleTR: "Sonuçları nelerdir?" },
                    { answer: "Context", pronunciation: "Kontekst", question: "Bağlam", example: "In this context, it makes sense.", exampleTR: "Bu bağlamda mantıklı." },
                    { answer: "Framework", pronunciation: "Freymwörk", question: "Çerçeve", example: "We need a legal framework.", exampleTR: "Yasal bir çerçeveye ihtiyacımız var." },
                    { answer: "Hypothesis", pronunciation: "Haypathısis", question: "Hipotez", example: "Test the hypothesis.", exampleTR: "Hipotezi test et." },
                    { answer: "Phenomenon", pronunciation: "Finamınan", question: "Olgu/Fenomen", example: "It is a natural phenomenon.", exampleTR: "Bu doğal bir olgudur." },
                    { answer: "Strategy", pronunciation: "Stretıci", question: "Strateji", example: "We have a long-term strategy.", exampleTR: "Uzun vadeli bir stratejimiz var." },
                    { answer: "Analysis", pronunciation: "Enelısis", question: "Analiz", example: "The analysis is detailed.", exampleTR: "Analiz detaylı." }
                ]
            },
            {
                name: "Economy",
                pool: [
                    { answer: "Inflation", pronunciation: "İnfleyşın", question: "Enflasyon", example: "Inflation is rising.", exampleTR: "Enflasyon artıyor." },
                    { answer: "Investment", pronunciation: "İnvestmınt", question: "Yatırım", example: "Foreign investment is important.", exampleTR: "Yabancı yatırım önemlidir." },
                    { answer: "Revenue", pronunciation: "Revınyu", question: "Gelir", example: "The company's revenue increased.", exampleTR: "Şirketin geliri arttı." },
                    { answer: "Debt", pronunciation: "Det", question: "Borç", example: "They are in debt.", exampleTR: "Borç içindeler." },
                    { answer: "Currency", pronunciation: "Körınsi", question: "Para birimi", example: "The currency is weak.", exampleTR: "Para birimi zayıf." },
                    { answer: "Stock", pronunciation: "Stak", question: "Hisse senedi", example: "Stock prices fell.", exampleTR: "Hisse senedi fiyatları düştü." },
                    { answer: "Trade", pronunciation: "Treyd", question: "Ticaret", example: "International trade is vital.", exampleTR: "Uluslararası ticaret hayatidir." },
                    { answer: "Budget", pronunciation: "Bacıt", question: "Bütçe", example: "We have a tight budget.", exampleTR: "Sıkı bir bütçemiz var." },
                    { answer: "Recession", pronunciation: "Riseşın", question: "Durgunluk", example: "The economy is in recession.", exampleTR: "Ekonomi durgunlukta." },
                    { answer: "Growth", pronunciation: "Grolth", question: "Büyüme", example: "Economic growth is slow.", exampleTR: "Ekonomik büyüme yavaş." }
                ]
            },
            {
                name: "Psychology",
                pool: [
                    { answer: "Behavior", pronunciation: "Biheyvyır", question: "Davranış", example: "Study human behavior.", exampleTR: "İnsan davranışını incele." },
                    { answer: "Cognitive", pronunciation: "Kagnıtiv", question: "Bilişsel", example: "Cognitive skills are important.", exampleTR: "Bilişsel beceriler önemlidir." },
                    { answer: "Emotion", pronunciation: "İmoşın", question: "Duygu", example: "She showed no emotion.", exampleTR: "Hiç duygu göstermedi." },
                    { answer: "Mental", pronunciation: "Mentıl", question: "Zihinsel", example: "Mental health matters.", exampleTR: "Zihinsel sağlık önemlidir." },
                    { answer: "Therapy", pronunciation: "Therıpi", question: "Terapi", example: "He is in therapy.", exampleTR: "O terapide." },
                    { answer: "Stress", pronunciation: "Stres", question: "Stres", example: "Reduce your stress.", exampleTR: "Stresini azalt." },
                    { answer: "Memory", pronunciation: "Memıri", question: "Hafıza", example: "I have a vivid memory.", exampleTR: "Canlı bir hatıram var." },
                    { answer: "Perception", pronunciation: "Pörsepşın", question: "Algı", example: "Perception is reality.", exampleTR: "Algı gerçekliktir." },
                    { answer: "Conscious", pronunciation: "Kanşıs", question: "Bilinçli", example: "It was a conscious decision.", exampleTR: "Bu bilinçli bir karardı." },
                    { answer: "Personality", pronunciation: "Pörsınelıti", question: "Kişilik", example: "She has a nice personality.", exampleTR: "Hoş bir kişiliği var." }
                ]
            },
            {
                name: "Law",
                pool: [
                    { answer: "Justice", pronunciation: "Castıs", question: "Adalet", example: "Justice was served.", exampleTR: "Adalet yerini buldu." },
                    { answer: "Regulation", pronunciation: "Regyuleyşın", question: "Düzenleme", example: "New regulations are in place.", exampleTR: "Yeni düzenlemeler yürürlükte." },
                    { answer: "Contract", pronunciation: "Kontrekt", question: "Sözleşme", example: "Read the contract carefully.", exampleTR: "Sözleşmeyi dikkatlice oku." },
                    { answer: "Legal", pronunciation: "Ligıl", question: "Yasal", example: "Seek legal advice.", exampleTR: "Yasal tavsiye al." },
                    { answer: "Court", pronunciation: "Kort", question: "Mahkeme", example: "The court is in session.", exampleTR: "Mahkeme oturumda." },
                    { answer: "Crime", pronunciation: "Kraym", question: "Suç", example: "Report the crime.", exampleTR: "Suçu bildir." },
                    { answer: "Evidence", pronunciation: "Evidıns", question: "Kanıt", example: "The evidence is clear.", exampleTR: "Kanıt açık." },
                    { answer: "Guilty", pronunciation: "Gilti", question: "Suçlu", example: "The jury found him guilty.", exampleTR: "Jüri onu suçlu buldu." },
                    { answer: "Judge", pronunciation: "Cac", question: "Hakim", example: "The judge spoke.", exampleTR: "Hakim konuştu." },
                    { answer: "Lawyer", pronunciation: "Loyır", question: "Avukat", example: "I need a lawyer.", exampleTR: "Bir avukata ihtiyacım var." }
                ]
            },
            {
                name: "Innovation",
                pool: [
                    { answer: "Breakthrough", pronunciation: "Breykthru", question: "Büyük buluş", example: "A scientific breakthrough.", exampleTR: "Bilimsel bir büyük buluş." },
                    { answer: "Prototype", pronunciation: "Protıtayp", question: "Prototip", example: "They built a prototype.", exampleTR: "Bir prototip inşa ettiler." },
                    { answer: "Evolution", pronunciation: "Ivıluşın", question: "Evrim", example: "The evolution of technology.", exampleTR: "Teknolojinin evrimi." },
                    { answer: "Digital", pronunciation: "Dicıtıl", question: "Dijital", example: "The digital revolution.", exampleTR: "Dijital devrim." },
                    { answer: "Virtual", pronunciation: "Vörçuıl", question: "Sanal", example: "Virtual reality is cool.", exampleTR: "Sanal gerçeklik havalı." },
                    { answer: "Network", pronunciation: "Netwörk", question: "Ağ", example: "Expand your network.", exampleTR: "Ağını genişlet." },
                    { answer: "Automation", pronunciation: "Otımeyşın", question: "Otomasyon", example: "Automation saves time.", exampleTR: "Otomasyon zaman kazandırır." },
                    { answer: "Device", pronunciation: "Divays", question: "Cihaz", example: "A smart device.", exampleTR: "Akıllı bir cihaz." },
                    { answer: "System", pronunciation: "Sistım", question: "Sistem", example: "The system crashed.", exampleTR: "Sistem çöktü." },
                    { answer: "Method", pronunciation: "Methıd", question: "Yöntem", example: "A new method of teaching.", exampleTR: "Yeni bir öğretim yöntemi." }
                ]
            },
            {
                name: "Society",
                pool: [
                    { answer: "Community", pronunciation: "Kımyuniti", question: "Topluluk", example: "Help your community.", exampleTR: "Topluluğuna yardım et." },
                    { answer: "Population", pronunciation: "Papyuleyşın", question: "Nüfus", example: "The population is growing.", exampleTR: "Nüfus artıyor." },
                    { answer: "Diversity", pronunciation: "Dayvörsıti", question: "Çeşitlilik", example: "Diversity is a strength.", exampleTR: "Çeşitlilik bir güçtür." },
                    { answer: "Equality", pronunciation: "İkwalıti", question: "Eşitlik", example: "We fight for equality.", exampleTR: "Eşitlik için savaşıyoruz." },
                    { answer: "Welfare", pronunciation: "Welfeyr", question: "Refah", example: "Social welfare programs.", exampleTR: "Sosyal refah programları." },
                    { answer: "Poverty", pronunciation: "Pavırti", question: "Yoksulluk", example: "End poverty now.", exampleTR: "Yoksulluğu şimdi bitir." },
                    { answer: "Migration", pronunciation: "Maygreyşın", question: "Göç", example: "Mass migration.", exampleTR: "Kitlesel göç." },
                    { answer: "Urban", pronunciation: "Örbın", question: "Kentsel", example: "Urban planning.", exampleTR: "Kentsel planlama." },
                    { answer: "Rural", pronunciation: "Rurıl", question: "Kırsal", example: "Rural areas.", exampleTR: "Kırsal alanlar." },
                    { answer: "Development", pronunciation: "Divelıpmınt", question: "Gelişim", example: "Sustainable development.", exampleTR: "Sürdürülebilir kalkınma." }
                ]
            }
        ],
        C2: [
            {
                name: "Philosophy",
                pool: [
                    { answer: "Existence", pronunciation: "Egzistıns", question: "Varoluş", example: "The nature of existence.", exampleTR: "Varoluşun doğası." },
                    { answer: "Ethics", pronunciation: "Ethiks", question: "Etik", example: "Ethics deals with morality.", exampleTR: "Etik ahlakla ilgilenir." },
                    { answer: "Logic", pronunciation: "Lacik", question: "Mantık", example: "Use logic to solve it.", exampleTR: "Çözmek için mantık kullan." },
                    { answer: "Metaphysics", pronunciation: "Metafiziks", question: "Metafizik", example: "Metaphysics is complex.", exampleTR: "Metafizik karmaşıktır." },
                    { answer: "Consciousness", pronunciation: "Kanşisnıs", question: "Bilinç", example: "The mystery of consciousness.", exampleTR: "Bilinç gizemi." },
                    { answer: "Epistemology", pronunciation: "Epistımalaci", question: "Epistemoloji", example: "Epistemology studies knowledge.", exampleTR: "Epistemoloji bilgiyi inceler." },
                    { answer: "Paradox", pronunciation: "Perıdaks", question: "Paradoks", example: "This is a paradox.", exampleTR: "Bu bir paradoks." },
                    { answer: "Rational", pronunciation: "Reşınıl", question: "Rasyonel", example: "Be rational.", exampleTR: "Rasyonel ol." },
                    { answer: "Moral", pronunciation: "Morıl", question: "Ahlaki", example: "A moral dilemma.", exampleTR: "Ahlaki bir ikilem." },
                    { answer: "Wisdom", pronunciation: "Wizdım", question: "Bilgelik", example: "Age brings wisdom.", exampleTR: "Yaş bilgelik getirir." }
                ]
            },
            {
                name: "Literature",
                pool: [
                    { answer: "Metaphor", pronunciation: "Metıfor", question: "Metafor", example: "Life is a metaphor.", exampleTR: "Hayat bir metafordur." },
                    { answer: "Narrative", pronunciation: "Nerıtiv", question: "Anlatı", example: "A compelling narrative.", exampleTR: "Sürükleyici bir anlatı." },
                    { answer: "Genre", pronunciation: "Janra", question: "Tür", example: "What is your favorite genre?", exampleTR: "En sevdiğin tür nedir?" },
                    { answer: "Irony", pronunciation: "Ayrıni", question: "İroni", example: "The irony of the situation.", exampleTR: "Durumun ironisi." },
                    { answer: "Protagonist", pronunciation: "Protegınist", question: "Başkahraman", example: "The protagonist wins.", exampleTR: "Başkahraman kazanır." },
                    { answer: "Antagonist", pronunciation: "Entegınist", question: "Antagonist", example: "The villain is the antagonist.", exampleTR: "Kötü adam antagonisttir." },
                    { answer: "Theme", pronunciation: "Thim", question: "Tema", example: "The main theme is love.", exampleTR: "Ana tema aşktır." },
                    { answer: "Symbolism", pronunciation: "Simbolizm", question: "Sembolizm", example: "The use of symbolism.", exampleTR: "Sembolizmin kullanımı." },
                    { answer: "Rhetoric", pronunciation: "Retırik", question: "Retorik", example: "Political rhetoric.", exampleTR: "Siyasi retorik." },
                    { answer: "Allegory", pronunciation: "Elıgori", question: "Alegori", example: "The story is an allegory.", exampleTR: "Hikaye bir alegoridir." }
                ]
            },
            {
                name: "Science",
                pool: [
                    { answer: "Quantum", pronunciation: "Kwantım", question: "Kuantum", example: "Quantum physics.", exampleTR: "Kuantum fiziği." },
                    { answer: "Relativity", pronunciation: "Relıtivıti", question: "Görelilik", example: "Theory of relativity.", exampleTR: "Görelilik teorisi." },
                    { answer: "Organism", pronunciation: "Orgınizm", question: "Organizma", example: "A living organism.", exampleTR: "Yaşayan bir organizma." },
                    { answer: "Photosynthesis", pronunciation: "Fotosinthısis", question: "Fotosentez", example: "Plants use photosynthesis.", exampleTR: "Bitkiler fotosentez kullanır." },
                    { answer: "Molecule", pronunciation: "Malıkyul", question: "Molekül", example: "Water molecule.", exampleTR: "Su molekülü." },
                    { answer: "Gravity", pronunciation: "Grevıti", question: "Yerçekimi", example: "Zero gravity.", exampleTR: "Sıfır yerçekimi." },
                    { answer: "Radiation", pronunciation: "Reydieyşın", question: "Radyasyon", example: "Nuclear radiation.", exampleTR: "Nükleer radyasyon." },
                    { answer: "Evolutionary", pronunciation: "Ivıluşınery", question: "Evrimsel", example: "Evolutionary biology.", exampleTR: "Evrimsel biyoloji." },
                    { answer: "Genetic", pronunciation: "Cınetik", question: "Genetik", example: "Genetic engineering.", exampleTR: "Genetik mühendisliği." },
                    { answer: "Neurology", pronunciation: "Nurolıci", question: "Nöroloji", example: "He studies neurology.", exampleTR: "Nöroloji okuyor." }
                ]
            },
            {
                name: "Politics",
                pool: [
                    { answer: "Sovereignty", pronunciation: "Savrınti", question: "Egemenlik", example: "National sovereignty.", exampleTR: "Ulusal egemenlik." },
                    { answer: "Diplomacy", pronunciation: "Diplomısi", question: "Diplomasi", example: "International diplomacy.", exampleTR: "Uluslararası diplomasi." },
                    { answer: "Bureaucracy", pronunciation: "Byurakrısi", question: "Bürokrasi", example: "Too much bureaucracy.", exampleTR: "Çok fazla bürokrasi." },
                    { answer: "Legislature", pronunciation: "Cecısleyçır", question: "Yasama organı", example: "The legislature meets today.", exampleTR: "Yasama organı bugün toplanıyor." },
                    { answer: "Constitution", pronunciation: "Konstıtuşın", question: "Anayasa", example: "The US Constitution.", exampleTR: "ABD Anayasası." },
                    { answer: "Amendment", pronunciation: "Emendmınt", question: "Yasa değişikliği", example: "First Amendment.", exampleTR: "Birinci Değişiklik." },
                    { answer: "Coalition", pronunciation: "Koılişın", question: "Koalisyon", example: "A coalition government.", exampleTR: "Koalisyon hükümeti." },
                    { answer: "Referendum", pronunciation: "Refırendım", question: "Referandum", example: "Hold a referendum.", exampleTR: "Referandum yap." },
                    { answer: "Autonomy", pronunciation: "Otanımi", question: "Özerklik", example: "Regional autonomy.", exampleTR: "Bölgesel özerklik." },
                    { answer: "Ideology", pronunciation: "Aydialıci", question: "İdeoloji", example: "Political ideology.", exampleTR: "Siyasi ideoloji." }
                ]
            },
            {
                name: "Economics",
                pool: [
                    { answer: "Fiscal", pronunciation: "Fiskıl", question: "Mali", example: "Fiscal policy.", exampleTR: "Mali politika." },
                    { answer: "Monetary", pronunciation: "Manıteri", question: "Parasal", example: "Monetary system.", exampleTR: "Parasal sistem." },
                    { answer: "Subsidy", pronunciation: "Sabsıdi", question: "Sübvansiyon", example: "Government subsidy.", exampleTR: "Hükümet sübvansiyonu." },
                    { answer: "Tariff", pronunciation: "Terif", question: "Gümrük vergisi", example: "Import tariffs.", exampleTR: "İthalat gümrük vergileri." },
                    { answer: "Deficit", pronunciation: "Defisit", question: "Açık (Bütçe)", example: "Budget deficit.", exampleTR: "Bütçe açığı." },
                    { answer: "Asset", pronunciation: "Eset", question: "Varlık", example: "Liquid assets.", exampleTR: "Likit varlıklar." },
                    { answer: "Liability", pronunciation: "Laybiliti", question: "Yükümlülük", example: "Assets and liabilities.", exampleTR: "Varlıklar ve yükümlülükler." },
                    { answer: "Equity", pronunciation: "Ekwıti", question: "Özkaynak", example: "Private equity.", exampleTR: "Özel sermaye." },
                    { answer: "Derivative", pronunciation: "Dirivıtiv", question: "Türev", example: "Financial derivatives.", exampleTR: "Finansal türevler." },
                    { answer: "Macroeconomics", pronunciation: "Mekroikanamiks", question: "Makroekonomi", example: "Study macroeconomics.", exampleTR: "Makroekonomi çalış." }
                ]
            },
            {
                name: "Advanced",
                pool: [
                    { answer: "Ubiquitous", pronunciation: "Yubikwıtıs", question: "Her yerde bulunan", example: "Smartphones are ubiquitous.", exampleTR: "Akıllı telefonlar her yerde bulunur." },
                    { answer: "Ephemeral", pronunciation: "Ifemırıl", question: "Geçici", example: "Beauty is ephemeral.", exampleTR: "Güzellik geçicidir." },
                    { answer: "Serendipity", pronunciation: "Serındipıti", question: "Mutlu tesadüf", example: "It was pure serendipity.", exampleTR: "Tamamen mutlu bir tesadüftü." },
                    { answer: "Resilience", pronunciation: "Rizilyıns", question: "Direnç/Esneklik", example: "Building resilience.", exampleTR: "Direnç oluşturma." },
                    { answer: "Ambiguity", pronunciation: "Embigyuıti", question: "Belirsizlik", example: "Avoid ambiguity.", exampleTR: "Belirsizlikten kaçın." },
                    { answer: "Paradigm", pronunciation: "Perıdaym", question: "Paradigma", example: "A paradigm shift.", exampleTR: "Bir paradigma değişimi." },
                    { answer: "Nuance", pronunciation: "Nuans", question: "Nüans", example: "Understand the nuance.", exampleTR: "Nüansı anla." },
                    { answer: "Aesthetic", pronunciation: "Esthetik", question: "Estetik", example: "Aesthetic appeal.", exampleTR: "Estetik çekicilik." },
                    { answer: "Pragmatic", pronunciation: "Pregmetik", question: "Pragmatik", example: "A pragmatic approach.", exampleTR: "Pragmatik bir yaklaşım." },
                    { answer: "Cognizant", pronunciation: "Kagnizınt", question: "Farkında olan", example: "Be cognizant of the risks.", exampleTR: "Risklerin farkında ol." }
                ]
            }
        ],
        Grade9_Unit1: [
            {
                name: "Countries & Languages",
                fixedPoints: 1,
                pool: [
                    { answer: "Azerbaijan", pronunciation: "Azırbaycan", question: "Azerbaycan", example: "Baku is the capital of Azerbaijan.", exampleTR: "Bakü, Azerbaycan'ın başkentidir." },
                    { answer: "Poland", pronunciation: "Polınd", question: "Polonya", example: "We visited Poland last summer.", exampleTR: "Geçen yaz Polonya'yı ziyaret ettik." },
                    { answer: "Hungary", pronunciation: "Hangeri", question: "Macaristan", example: "Hungary is in Central Europe.", exampleTR: "Macaristan Orta Avrupa'dadır." },
                    { answer: "Bulgaria", pronunciation: "Bulgeriya", question: "Bulgaristan", example: "Bulgaria has beautiful beaches.", exampleTR: "Bulgaristan'ın güzel plajları vardır." },
                    { answer: "Norway", pronunciation: "Norvey", question: "Norveç", example: "It is very cold in Norway in winter.", exampleTR: "Kışın Norveç çok soğuktur." },
                    { answer: "Türkiye", pronunciation: "Türkiye", question: "Türkiye", example: "Türkiye connects Europe and Asia.", exampleTR: "Türkiye Avrupa ve Asya'yı birbirine bağlar." },
                    { answer: "South Korea", pronunciation: "Sauth Koriya", question: "Güney Kore", example: "Seoul is a big city in South Korea.", exampleTR: "Seul, Güney Kore'de büyük bir şehirdir." },
                    { answer: "Italy", pronunciation: "İtaly", question: "İtalya", example: "Pizza comes from Italy.", exampleTR: "Pizza İtalya'dan gelir." },
                    { answer: "Spain", pronunciation: "Sapeyn", question: "İspanya", example: "They speak Spanish in Spain.", exampleTR: "İspanya'da İspanyolca konuşurlar." },
                    { answer: "Germany", pronunciation: "Cörmıny", question: "Almanya", example: "Berlin is the capital of Germany.", exampleTR: "Berlin Almanya'nın başkentidir." },
                    { answer: "Turkish", pronunciation: "Törkiş", question: "Türk/Türkçe", example: "He speaks Turkish fluently.", exampleTR: "O akıcı bir şekilde Türkçe konuşur." },
                    { answer: "German", pronunciation: "Cörmın", question: "Alman/Almanca", example: "German is a difficult language.", exampleTR: "Almanca zor bir dildir." },
                    { answer: "Spanish", pronunciation: "Speniş", question: "İspanyol/İspanyolca", example: "She is learning Spanish.", exampleTR: "O İspanyolca öğreniyor." }
                ]
            },
            {
                name: "Tourist Spots",
                pool: [
                    { answer: "Sightseeing", pronunciation: "Saytsiiing", question: "Gezi/Gezme", example: "We went sightseeing in Paris.", exampleTR: "Paris'te geziye çıktık." },
                    { answer: "Castle", pronunciation: "Kasıl", question: "Kale", example: "The castle is very old.", exampleTR: "Kale çok eski." },
                    { answer: "Monument", pronunciation: "Monyumınt", question: "Anıt", example: "This monument honors heroes.", exampleTR: "Bu anıt kahramanları onurlandırır." },
                    { answer: "Tower", pronunciation: "Tawır", question: "Kule", example: "The Eiffel Tower is tall.", exampleTR: "Eyfel Kulesi uzundur." },
                    { answer: "Palace", pronunciation: "Pelıs", question: "Saray", example: "The queen lives in a palace.", exampleTR: "Kraliçe bir sarayda yaşıyor." },
                    { answer: "Ancient ruin", pronunciation: "Eynşınt ruin", question: "Antik kalıntı", example: "We visited ancient ruins.", exampleTR: "Antik kalıntıları ziyaret ettik." },
                    { answer: "Square", pronunciation: "Skueyr", question: "Meydan", example: "Let's meet at the square.", exampleTR: "Meydanda buluşalım." },
                    { answer: "Trip", pronunciation: "Trip", question: "Gezi", example: "We had a nice trip.", exampleTR: "Güzel bir gezi yaptık." },
                    { answer: "Hike", pronunciation: "Hayk", question: "Doğa yürüyüşü", example: "I like to hike in nature.", exampleTR: "Doğada yürüyüş yapmayı severim." },
                    { answer: "Journey", pronunciation: "Cörni", question: "Yolculuk", example: "Life is a long journey.", exampleTR: "Hayat uzun bir yolculuktur." },
                    { answer: "Travel", pronunciation: "Trevıl", question: "Seyahat etmek", example: "I love to travel.", exampleTR: "Seyahat etmeyi severim." },
                    { answer: "Explore", pronunciation: "Eksplor", question: "Keşfetmek", example: "Let's explore the city.", exampleTR: "Şehri keşfedelim." },
                    { answer: "Boat ride", pronunciation: "Bot rayd", question: "Tekne gezisi", example: "We went on a boat ride.", exampleTR: "Tekne gezisine çıktık." },
                    { answer: "Take a trip", pronunciation: "Teyk e trip", question: "Geziye çıkmak", example: "We took a trip to Spain.", exampleTR: "İspanya'ya geziye çıktık." },
                    { answer: "Stroll through", pronunciation: "Strol thru", question: "Dolaşmak", example: "We strolled through the park.", exampleTR: "Parkta dolaştık." }
                ]
            },
            {
                name: "Geography",
                pool: [
                    { answer: "Forest", pronunciation: "Forıst", question: "Orman", example: "The forest is green.", exampleTR: "Orman yeşildir." },
                    { answer: "River", pronunciation: "Rivır", question: "Nehir", example: "The river is long.", exampleTR: "Nehir uzundur." },
                    { answer: "Lake", pronunciation: "Leyk", question: "Göl", example: "There is a boat on the lake.", exampleTR: "Gölde bir tekne var." },
                    { answer: "Mountain", pronunciation: "Mauntın", question: "Dağ", example: "The mountain is high.", exampleTR: "Dağ yüksektir." },
                    { answer: "Desert", pronunciation: "Dezırt", question: "Çöl", example: "Deserts are hot.", exampleTR: "Çöller sıcaktır." }
                ]
            },
            {
                name: "Culture & Heritage",
                pool: [
                    { answer: "Ancient", pronunciation: "Eynşınt", question: "Antik/Eski", example: "This is an ancient city.", exampleTR: "Bu antik bir şehirdir." },
                    { answer: "History", pronunciation: "Histıri", question: "Tarih", example: "I like learning history.", exampleTR: "Tarih öğrenmeyi severim." },
                    { answer: "Carpet art", pronunciation: "Karpıt art", question: "Halı sanatı", example: "Carpet art is traditional.", exampleTR: "Halı sanatı gelenekseldir." },
                    { answer: "Cultural heritage", pronunciation: "Kalçırıl herıtıc", question: "Kültürel miras", example: "Protect our cultural heritage.", exampleTR: "Kültürel mirasımızı koruyalım." },
                    { answer: "Traditional", pronunciation: "Trıdişınıl", question: "Geleneksel", example: "It is a traditional dance.", exampleTR: "Bu geleneksel bir danstır." }
                ]
            },
            {
                name: "Opinions",
                pool: [
                    { answer: "Amazing", pronunciation: "Imeyzing", question: "Şaşırtıcı/Harika", example: "The view is amazing.", exampleTR: "Manzara harika." },
                    { answer: "Unique", pronunciation: "Yunik", question: "Eşsiz", example: "This place is unique.", exampleTR: "Burası eşsiz." },
                    { answer: "Worth seeing", pronunciation: "Wörth siing", question: "Görülmeye değer", example: "The museum is worth seeing.", exampleTR: "Müze görülmeye değer." },
                    { answer: "Unexplored", pronunciation: "Aneksplord", question: "Keşfedilmemiş", example: "It is an unexplored island.", exampleTR: "Bu keşfedilmemiş bir ada." },
                    { answer: "Peaceful", pronunciation: "Piisful", question: "Huzurlu", example: "The village is very peaceful.", exampleTR: "Köy çok huzurlu." }
                ]
            },
            {
                name: "Digital Life",
                pool: [
                    { answer: "Prevent", pronunciation: "Privent", question: "Önlemek", example: "We must prevent data theft.", exampleTR: "Veri hırsızlığını önlemeliyiz." },
                    { answer: "Cybersecurity", pronunciation: "Saybırsıkyurıti", question: "Siber güvenlik", example: "Cybersecurity is important.", exampleTR: "Siber güvenlik önemlidir." },
                    { answer: "Data theft", pronunciation: "Deyta theft", question: "Veri hırsızlığı", example: "Watch out for data theft.", exampleTR: "Veri hırsızlığına dikkat et." },
                    { answer: "Cyberattack", pronunciation: "Saybıratek", question: "Siber saldırı", example: "There was a cyberattack.", exampleTR: "Bir siber saldırı oldu." },
                    { answer: "Personal information", pronunciation: "Pörsınıl informeyşın", question: "Kişisel bilgi", example: "Protect your personal information.", exampleTR: "Kişisel bilgilerini koru." }
                ]
            }
        ],
        Grade9_Unit2: [
            {
                name: "Routines",
                pool: [
                    { answer: "Wake up", pronunciation: "Weyk ap", question: "Uyanmak", example: "I wake up at 7 AM.", exampleTR: "Sabah 7'de uyanırım." },
                    { answer: "Comb hair", pronunciation: "Kom heyr", question: "Saç taramak", example: "She combs her hair every morning.", exampleTR: "O her sabah saçını tarar." },
                    { answer: "Get dressed", pronunciation: "Get drest", question: "Giyinmek", example: "I get dressed quickly.", exampleTR: "Hızlıca giyinirim." },
                    { answer: "Attend classes", pronunciation: "Etend klasız", question: "Derslere katılmak", example: "We attend classes on weekdays.", exampleTR: "Hafta içi derslere katılırız." },
                    { answer: "Take notes", pronunciation: "Teyk nots", question: "Not almak", example: "I take notes during the lesson.", exampleTR: "Ders sırasında not alırım." },
                    { answer: "Leave home", pronunciation: "Liiv hom", question: "Evden çıkmak", example: "I leave home at 8 AM.", exampleTR: "Evden sabah 8'de çıkarım." },
                    { answer: "Return home", pronunciation: "Ritörn hom", question: "Eve dönmek", example: "I return home at 4 PM.", exampleTR: "Eve saat 4'te dönerim." },
                    { answer: "Do homework", pronunciation: "Du homwörk", question: "Ödev yapmak", example: "He does his homework after school.", exampleTR: "Okuldan sonra ödevini yapar." },
                    { answer: "Have a shower", pronunciation: "Hev e şawır", question: "Duş almak", example: "I have a shower before bed.", exampleTR: "Yatmadan önce duş alırım." },
                    { answer: "Run errands", pronunciation: "Ran erınds", question: "Ayak işlerini yapmak", example: "My mom runs errands on Saturdays.", exampleTR: "Annem Cumartesi günleri ayak işlerini yapar." }
                ]
            },
            {
                name: "Time Phrases",
                pool: [
                    { answer: "Every day", pronunciation: "Evri dey", question: "Her gün", example: "I drink milk every day.", exampleTR: "Her gün süt içerim." },
                    { answer: "Often", pronunciation: "Ofın", question: "Sık sık", example: "We often go to the cinema.", exampleTR: "Sık sık sinemaya gideriz." },
                    { answer: "Rarely", pronunciation: "Rerli", question: "Nadiren", example: "He rarely eats chocolate.", exampleTR: "O nadiren çikolata yer." },
                    { answer: "Early", pronunciation: "Örli", question: "Erken", example: "I wake up early.", exampleTR: "Erken uyanırım." },
                    { answer: "Quickly", pronunciation: "Kwikli", question: "Hızlıca", example: "Run quickly!", exampleTR: "Hızlıca koş!" },
                    { answer: "Occasionally", pronunciation: "Okeyjınıli", question: "Ara sıra", example: "I visit them occasionally.", exampleTR: "Onları ara sıra ziyaret ederim." },
                    { answer: "At weekends", pronunciation: "Et wikends", question: "Hafta sonları", example: "I relax at weekends.", exampleTR: "Hafta sonları dinlenirim." },
                    { answer: "In the mornings", pronunciation: "İn dı mornings", question: "Sabahları", example: "I feel fresh in the mornings.", exampleTR: "Sabahları zinde hissederim." }
                ]
            },
            {
                name: "Other",
                pool: [
                    { answer: "Classmates", pronunciation: "Klasmeyts", question: "Sınıf arkadaşları", example: "My classmates are friendly.", exampleTR: "Sınıf arkadaşlarım arkadaş canlısıdır." },
                    { answer: "Friendships", pronunciation: "Frendşips", question: "Arkadaşlıklar", example: "Friendships are important.", exampleTR: "Arkadaşlıklar önemlidir." },
                    { answer: "Accessories", pronunciation: "Eksesıriz", question: "Aksesuarlar", example: "She likes accessories like rings.", exampleTR: "Yüzük gibi aksesuarları sever." }
                ]
            }
        ],
        Grade9_Unit3: [
            {
                name: "Appearance",
                pool: [
                    { answer: "Plump", pronunciation: "Plamp", question: "Balık etli", example: "The baby has plump cheeks.", exampleTR: "Bebeğin tombul yanakları var." },
                    { answer: "Blond", pronunciation: "Bland", question: "Sarışın", example: "He has blond hair.", exampleTR: "Onun sarı saçları var." },
                    { answer: "Brunette", pronunciation: "Brunet", question: "Esmer", example: "She is a beautiful brunette.", exampleTR: "O güzel bir esmer." },
                    { answer: "Curly hair", pronunciation: "Körli heyr", question: "Kıvırcık saç", example: "My sister has curly hair.", exampleTR: "Kız kardeşimin kıvırcık saçları var." },
                    { answer: "Slim", pronunciation: "Slim", question: "Zayıf/İnce", example: "She is tall and slim.", exampleTR: "O uzun ve incedir." },
                    { answer: "Handsome", pronunciation: "Hensım", question: "Yakışıklı", example: "The actor is very handsome.", exampleTR: "Oyuncu çok yakışıklı." },
                    { answer: "Attractive", pronunciation: "Etrektiv", question: "Çekici", example: "She has an attractive smile.", exampleTR: "Çekici bir gülümsemesi var." },
                    { answer: "Cute", pronunciation: "Kyut", question: "Sevimli", example: "The puppy is very cute.", exampleTR: "Köpek yavrusu çok sevimli." },
                    { answer: "Middle-aged", pronunciation: "Midıl eycd", question: "Orta yaşlı", example: "He is a middle-aged man.", exampleTR: "O orta yaşlı bir adam." }
                ]
            },
            {
                name: "Personality",
                pool: [
                    { answer: "Cheerful", pronunciation: "Çiirful", question: "Neşeli", example: "She is always cheerful and happy.", exampleTR: "O her zaman neşeli ve mutludur." },
                    { answer: "Honest", pronunciation: "Anıst", question: "Dürüst", example: "You must be honest with me.", exampleTR: "Bana karşı dürüst olmalısın." },
                    { answer: "Brave", pronunciation: "Breyv", question: "Cesur", example: "The firefighter was very brave.", exampleTR: "İtfaiyeci çok cesurdu." },
                    { answer: "Confident", pronunciation: "Konfıdınt", question: "Kendine güvenen", example: "He feels confident about the exam.", exampleTR: "Sınav konusunda kendine güveniyor." },
                    { answer: "Kind", pronunciation: "Kaynd", question: "Nazik", example: "Thank you for your kind words.", exampleTR: "Nazik sözlerin için teşekkür ederim." },
                    { answer: "Outgoing", pronunciation: "Autgoing", question: "Dışa dönük", example: "She is an outgoing person who loves parties.", exampleTR: "O, partileri seven dışa dönük biridir." },
                    { answer: "Careless", pronunciation: "Kerlıs", question: "Dikkatsiz", example: "Don't be careless when driving.", exampleTR: "Araba kullanırken dikkatsiz olma." },
                    { answer: "Smart", pronunciation: "Smart", question: "Zeki", example: "He is a very smart student.", exampleTR: "O çok zeki bir öğrencidir." },
                    { answer: "Shy", pronunciation: "Şay", question: "Utangaç", example: "He is too shy to speak in public.", exampleTR: "O, halk önünde konuşamayacak kadar utangaçtır." },
                    { answer: "Polite", pronunciation: "Polayt", question: "Kibar", example: "It is important to be polite to everyone.", exampleTR: "Herkese karşı kibar olmak önemlidir." }
                ]
            }
        ],
        Grade9_Unit4: [
            {
                name: "Jobs",
                pool: [
                    { answer: "Architect", pronunciation: "Arkitekt", question: "Mimar", example: "The architect designed a beautiful bridge.", exampleTR: "Mimar güzel bir köprü tasarladı." },
                    { answer: "Lawyer", pronunciation: "Loyır", question: "Avukat", example: "The lawyer defended his client in court.", exampleTR: "Avukat müvekkilini mahkemede savundu." },
                    { answer: "Pharmacist", pronunciation: "Farmısist", question: "Eczacı", example: "The pharmacist gave me the medicine.", exampleTR: "Eczacı bana ilacı verdi." },
                    { answer: "Journalist", pronunciation: "Cörnılist", question: "Gazeteci", example: "The journalist wrote the breaking news.", exampleTR: "Gazeteci son dakika haberini yazdı." },
                    { answer: "Accountant", pronunciation: "Ekauntınt", question: "Muhasebeci", example: "The accountant checks the financial records.", exampleTR: "Muhasebeci mali kayıtları kontrol eder." },
                    { answer: "Scientist", pronunciation: "Sayntist", question: "Bilim insanı", example: "The scientist is doing an experiment.", exampleTR: "Bilim insanı bir deney yapıyor." },
                    { answer: "Photographer", pronunciation: "Fotografır", question: "Fotoğrafçı", example: "The photographer took amazing photos.", exampleTR: "Fotoğrafçı harika fotoğraflar çekti." },
                    { answer: "Security guard", pronunciation: "Sıkyurıti gard", question: "Güvenlik görevlisi", example: "The security guard protects the building.", exampleTR: "Güvenlik görevlisi binayı korur." }
                ]
            },
            {
                name: "Members",
                pool: [
                    { answer: "Cousin", pronunciation: "Kazın", question: "Kuzen", example: "My cousin lives in another city.", exampleTR: "Kuzenim başka bir şehirde yaşıyor." },
                    { answer: "Nephew", pronunciation: "Nefyu", question: "Erkek yeğen", example: "My nephew likes playing football.", exampleTR: "Erkek yeğenim futbol oynamayı sever." },
                    { answer: "Niece", pronunciation: "Niis", question: "Kız yeğen", example: "My niece is very smart.", exampleTR: "Kız yeğenim çok zekidir." },
                    { answer: "Stepfather", pronunciation: "Stepfadher", question: "Üvey baba", example: "My stepfather is very kind to me.", exampleTR: "Üvey babam bana karşı çok naziktir." },
                    { answer: "Relatives", pronunciation: "Relıtivs", question: "Akrabalar", example: "We visited our relatives during the holiday.", exampleTR: "Tatil sırasında akrabalarımızı ziyaret ettik." },
                    { answer: "Aunt", pronunciation: "Ant", question: "Hala/Teyze", example: "My aunt makes delicious cakes.", exampleTR: "Teyzem/Halam lezzetli kekler yapar." }
                ]
            },
            {
                name: "Activities",
                pool: [
                    { answer: "Create content", pronunciation: "Krieyt kantent", question: "İçerik üretmek", example: "She creates content for social media.", exampleTR: "O, sosyal medya için içerik üretir." },
                    { answer: "Manage", pronunciation: "Menıc", question: "Yönetmek", example: "He manages a large team.", exampleTR: "O, büyük bir ekibi yönetir." },
                    { answer: "Advise", pronunciation: "Edvayz", question: "Tavsiye vermek", example: "I advised him to see a doctor.", exampleTR: "Ona doktora görünmesini tavsiye ettim." },
                    { answer: "Research", pronunciation: "Risörç", question: "Araştırma yapmak", example: "Scientists research new cures for diseases.", exampleTR: "Bilim insanları hastalıklar için yeni tedaviler araştırırlar." },
                    { answer: "Defend", pronunciation: "Difend", question: "Savunmak", example: "Soldiers defend their country.", exampleTR: "Askerler ülkelerini savunurlar." }
                ]
            }
        ],
        Grade9_Unit5: [
            {
                name: "House Types",
                pool: [
                    { answer: "Flat", pronunciation: "Flet", question: "Daire", example: "I live in a small flat.", exampleTR: "Küçük bir dairede yaşıyorum." },
                    { answer: "Villa", pronunciation: "Vila", question: "Villa", example: "They bought a luxury villa.", exampleTR: "Lüks bir villa aldılar." },
                    { answer: "Cottage", pronunciation: "Katıc", question: "Kır evi", example: "We stayed in a cozy cottage.", exampleTR: "Rahat bir kır evinde kaldık." },
                    { answer: "Detached house", pronunciation: "Diteçt haus", question: "Müstakil ev", example: "A detached house offers more privacy.", exampleTR: "Müstakil ev daha fazla mahremiyet sunar." },
                    { answer: "Bungalow", pronunciation: "Bangılo", question: "Bungalov", example: "The bungalow has a nice garden.", exampleTR: "Bungalovun güzel bir bahçesi var." },
                    { answer: "Penthouse", pronunciation: "Penthaus", question: "Çatı katı", example: "The penthouse has a great view.", exampleTR: "Çatı katının harika bir manzarası var." },
                ]
            },
            {
                name: "Rooms & Furniture",
                pool: [
                    { answer: "Living room", pronunciation: "Living rum", question: "Oturma odası", example: "We relax in the living room.", exampleTR: "Oturma odasında dinleniriz." },
                    { answer: "Kitchen", pronunciation: "Kiçın", question: "Mutfak", example: "He is cooking in the kitchen.", exampleTR: "O, mutfakta yemek yapıyor." },
                    { answer: "Bathroom", pronunciation: "Bathrum", question: "Banyo", example: "The bathroom is upstairs.", exampleTR: "Banyo üst kattadır." },
                    { answer: "Garage", pronunciation: "Garaj", question: "Garaj", example: "My dad repairs his car in the garage.", exampleTR: "Babam garajda arabasını tamir ediyor." },
                    { answer: "Sofa", pronunciation: "Sofa", question: "Kanepe", example: "This sofa is very comfortable.", exampleTR: "Bu kanepe çok rahattır." },
                    { answer: "Wardrobe", pronunciation: "Wordrob", question: "Gardırop", example: "I keep my clothes in the wardrobe.", exampleTR: "Kıyafetlerimi gardıropta saklarım." },
                    { answer: "Oven", pronunciation: "Avın", question: "Fırın", example: "Bake the cake in the oven.", exampleTR: "Keki fırında pişir." },
                    { answer: "Fridge", pronunciation: "Fric", question: "Buzdolabı", example: "Please put the milk in the fridge.", exampleTR: "Lütfen sütü buzdolabına koy." },
                    { answer: "Cushion", pronunciation: "Kuşın", question: "Minder", example: "She put a cushion on the chair.", exampleTR: "Sandalyeye bir minder koydu." },
                ]
            },
            {
                name: "Chores",
                pool: [
                    { answer: "Iron", pronunciation: "Ayrın", question: "Ütü yapmak", example: "I iron my shirts every Sunday.", exampleTR: "Gömleklerimi her Pazar ütülerim." },
                    { answer: "Tidy up", pronunciation: "Taydi ap", question: "Toplamak", example: "It takes time to tidy up the house.", exampleTR: "Evi toplamak zaman alır." },
                    { answer: "Do laundry", pronunciation: "Du londri", question: "Çamaşır yıkamak", example: "I do laundry on weekends.", exampleTR: "Hafta sonları çamaşır yıkarım." },
                    { answer: "Clean", pronunciation: "Kliin", question: "Temizlemek", example: "We clean the kitchen daily.", exampleTR: "Mutfağı her gün temizleriz." },
                    { answer: "Make the bed", pronunciation: "Meyk dı bed", question: "Yatağı yapmak", example: "I make the bed every morning.", exampleTR: "Her sabah yatağı yaparım." }
                ]
            }
        ],
        Grade9_Unit6: [
            {
                name: "Food",
                pool: [
                    { answer: "Cuisine", pronunciation: "Kwiziin", question: "Mutfak (Kültürü)", example: "Turkish cuisine is famous worldwide.", exampleTR: "Türk mutfağı dünya çapında ünlüdür." },
                    { answer: "Spicy", pronunciation: "Spaysi", question: "Baharatlı", example: "Some people like spicy food.", exampleTR: "Bazı insanlar baharatlı yiyecekleri sever." },
                    { answer: "Sour", pronunciation: "Sawır", question: "Ekşi", example: "Lemons taste very sour.", exampleTR: "Limonların tadı çok ekşidir." },
                    { answer: "Delicious", pronunciation: "Dilişıs", question: "Lezzetli", example: "This cake is delicious.", exampleTR: "Bu kek lezzetli." },
                    { answer: "Traditional", pronunciation: "Trıdişınıl", question: "Geleneksel", example: "We wear traditional clothes on holidays.", exampleTR: "Bayramlarda geleneksel kıyafetler giyeriz." },
                    { answer: "Fried", pronunciation: "Frayd", question: "Kızarmış", example: "I like fried potatoes.", exampleTR: "Kızarmış patatesi severim." },
                    { answer: "Vegetable", pronunciation: "Vecıtıbıl", question: "Sebze", example: "Eat more vegetables for your health.", exampleTR: "Sağlığın için daha fazla sebze ye." },
                    { answer: "Butter", pronunciation: "Batır", question: "Tereyağı", example: "Spread some butter on the bread.", exampleTR: "Ekmeğe biraz tereyağı sür." },
                    { answer: "Dessert", pronunciation: "Dizört", question: "Tatlı", example: "Ice cream is my favorite dessert.", exampleTR: "Dondurma en sevdiğim tatlıdır." },
                ]
            },
            {
                name: "City Life",
                pool: [
                    { answer: "Noise", pronunciation: "Noyz", question: "Gürültü", example: "There is too much noise in the city.", exampleTR: "Şehirde çok fazla gürültü var." },
                    { answer: "Pollution", pronunciation: "Poluşın", question: "Kirlilik", example: "Air pollution is a big problem.", exampleTR: "Hava kirliliği büyük bir sorundur." },
                    { answer: "Traffic", pronunciation: "Trefik", question: "Trafik", example: "The traffic is very heavy today.", exampleTR: "Bugün trafik çok yoğun." },
                    { answer: "Crowded", pronunciation: "Krawdıd", question: "Kalabalık", example: "The bus was very crowded.", exampleTR: "Otobüs çok kalabalıktı." },
                    { answer: "Feast", pronunciation: "Fiist", question: "Ziyafet/Bayram", example: "We had a big feast last night.", exampleTR: "Dün gece büyük bir ziyafet verdik." },
                    { answer: "Festival", pronunciation: "Festivıl", question: "Festival", example: "The music festival starts tomorrow.", exampleTR: "Müzik festivali yarın başlıyor." },
                ]
            }
        ],
        Grade9_Unit7: [
            {
                name: "Animals",
                pool: [
                    { answer: "Tiger", pronunciation: "Taygır", question: "Kaplan", example: "The tiger is a dangerous animal.", exampleTR: "Kaplan tehlikeli bir hayvandır." },
                    { answer: "Whale", pronunciation: "Weyıl", question: "Balina", example: "The blue whale is the largest animal.", exampleTR: "Mavi balina en büyük hayvandır." },
                    { answer: "Shark", pronunciation: "Şark", question: "Köpekbalığı", example: "Sharks live in the ocean.", exampleTR: "Köpekbalıkları okyanusta yaşar." },
                    { answer: "Penguin", pronunciation: "Pengwin", question: "Penguen", example: "Penguins cannot fly.", exampleTR: "Penguenler uçamaz." },
                    { answer: "Turtle", pronunciation: "Törtıl", question: "Kaplumbağa", example: "Turtles move very slowly.", exampleTR: "Kaplumbağalar çok yavaş hareket eder." },
                    { answer: "Elephant", pronunciation: "Elıfınt", question: "Fil", example: "The elephant has a long trunk.", exampleTR: "Filin uzun bir hortumu vardır." },
                ]
            },
            {
                name: "Environment",
                pool: [
                    { answer: "Climate change", pronunciation: "Klaymıt çeync", question: "İklim değişikliği", example: "Climate change affects the whole world.", exampleTR: "İklim değişikliği tüm dünyayı etkiliyor." },
                    { answer: "Habitat", pronunciation: "Hebitet", question: "Yaşam alanı", example: "The jungle is the tiger's habitat.", exampleTR: "Orman kaplanın yaşam alanıdır." },
                    { answer: "Pollution", pronunciation: "Poluşın", question: "Kirlilik", example: "We must stop pollution.", exampleTR: "Kirliliği durdurmalıyız." },
                    { answer: "Protect", pronunciation: "Protek", question: "Korumak", example: "We must protect nature.", exampleTR: "Doğayı korumalıyız." },
                    { answer: "Donate", pronunciation: "Doneyt", question: "Bağışlamak", example: "They donate money to charity.", exampleTR: "Hayır kurumlarına para bağışlarlar." },
                    { answer: "Volunteer", pronunciation: "Valıntiir", question: "Gönüllü", example: "She is a volunteer at the hospital.", exampleTR: "O, hastanede bir gönüllü." },
                    { answer: "Survive", pronunciation: "Sörvayv", question: "Hayatta kalmak", example: "Water is necessary to survive.", exampleTR: "Su hayatta kalmak için gereklidir." },
                    { answer: "Save", pronunciation: "Seyv", question: "Kurtarmak/Tasarruf etmek", example: "We should save energy.", exampleTR: "Enerji tasarrufu yapmalıyız." },
                ]
            }
        ],
        Grade9_Unit8: [
            {
                name: "Movies",
                pool: [
                    { answer: "Comedy", pronunciation: "Kamıdi", question: "Komedi", example: "I like watching comedy movies.", exampleTR: "Komedi filmleri izlemeyi severim." },
                    { answer: "Action", pronunciation: "Ekşın", question: "Aksiyon", example: "It was an exciting action movie.", exampleTR: "Heyecan verici bir aksiyon filmiydi." },
                    { answer: "Horror", pronunciation: "Horır", question: "Korku", example: "I am afraid of horror movies.", exampleTR: "Korku filmlerinden korkarım." },
                    { answer: "Sci-Fi", pronunciation: "Say-Fay", question: "Bilim Kurgu", example: "I love sci-fi stories about space.", exampleTR: "Uzayla ilgili bilim kurgu hikayelerini severim." },
                    { answer: "Director", pronunciation: "Dayrektır", question: "Yönetmen", example: "The director makes the movie.", exampleTR: "Yönetmen filmi yapar." },
                    { answer: "Documentary", pronunciation: "Dakyumentıri", question: "Belgesel", example: "We watched a documentary about lions.", exampleTR: "Aslanlar hakkında bir belgesel izledik." },
                ]
            },
            {
                name: "Future",
                pool: [
                    { answer: "Robot", pronunciation: "Robat", question: "Robot", example: "Robots can do many tasks.", exampleTR: "Robotlar birçok görevi yapabilir." },
                    { answer: "Alien", pronunciation: "Eyliyın", question: "Uzaylı", example: "Do you believe in aliens?", exampleTR: "Uzaylılara inanır mısın?" },
                    { answer: "Invention", pronunciation: "İnvenşın", question: "İcat", example: "The telephone was a great invention.", exampleTR: "Telefon harika bir icattı." },
                    { answer: "Discovery", pronunciation: "Diskavıri", question: "Keşif", example: "The discovery of fire changed everything.", exampleTR: "Ateşin keşfi her şeyi değiştirdi." },
                    { answer: "Space", pronunciation: "Speys", question: "Uzay", example: "Astronauts travel to space.", exampleTR: "Astronotlar uzaya seyahat eder." },
                    { answer: "Galaxy", pronunciation: "Geleksi", question: "Galaksi", example: "There are many stars in the galaxy.", exampleTR: "Galakside birçok yıldız vardır." },
                    { answer: "Discover", pronunciation: "Diskavır", question: "Keşfetmek", example: "Colombo discovered America.", exampleTR: "Kolomb Amerika'yı keşfetti." },
                    { answer: "Invent", pronunciation: "İnvent", question: "İcat etmek", example: "Edison invented the light bulb.", exampleTR: "Edison ampulü icat etti." },
                ]
            }
        ]
    }
};
