import {NgModule,Component,OnInit,ViewChild} from '@angular/core';
import { FormsModule,FormGroup,FormControl} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {MemberService} from '../service/member/member.service';
import {Router} from '@angular/router';
import { ProfileService } from '../service/profile/profile.service';
import {CarouselConfig} from 'ngx-bootstrap/carousel';


class Signup {
    constructor(public username1: string = '',
                public handleName: string = '',
                public age: string = '',
                public userAboutMe: string = '',
                public userInterests: string = '',
                public relationshipStatus: string = '',
                public language: string = '',
                public religion: string = '',
                public personality: string = '',
                public children: string = '',
                public education: string = '',
                public profession: string = '',
                public pets: string = '',
               
            ) { 


                
            }
}


@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.component.html',
  styleUrls: ['./setup-profile.component.css'],
  providers: [
    {
        provide: CarouselConfig,
        useValue: {
            noPause: true,
            showIndicators: true,
            noWrapSlides: false
        }
    }
]
})
export class SetupProfileComponent implements OnInit {

    model: Signup = new Signup();
    //setupProfileForm: any;
    @ViewChild('setupProfileForm') setupProfileForm: any;

  public searchMinMax: number[] = [18, 25];
  public aimrange: number[] = [18, 25];

  Userdetails: any = [];
  UserProfileImage: any = [];
  current_token;
  UserProfileImage_url = [];
  male;
  female;
  searchDistance;


  relationshipStatus_list = [
    "Single",
    "In a relationship",
    "Married",
    "In a civil union",
   "In a domestic partnership",
    "In an open relationship",
    "It's complicated",
    "Separated",
    "Divorced",
    "Widowed",   
  ];

  language_list = [
                "Akan",
                "Amharic",
                "Arabic",
                "Assamese",
                "Awash",
                "Azerbaijani",
                "Balochi",
                "Belarusian",
                "Bengali",
                "Bhojpuri",
                "Bulgarian",
                "Burmese",
                "Cantonese",
                "Cebuano",
                "Chattisgarhi",
                "Chew",
                "Chittagonian",
                "Czech",
                "Deccan",
                "Dhundhari",
                "Dutch",
                "Eastern Min",
                "French",
                "Fula",
                "Gan Chinese",
                "German",
                "Greek",
                "Gujarati",
                "Haitian Creole",
                "Hakka",
                "Haryanvi",
                "Hausa",
                "Hebrew",
                "Hiligaynon",
                "Hindi",
                "Hmong",
                "Hungarian",
                "Igbo",
                "Iloncano",
                "Indonesian",
                "Italian",
                "Japanese",
                "Javanese",
                "Jin",
                "Kannada",
                "Kazakh",
                "Khmer",
                "Kinyarwanda",
                "Kirundi",
                "Konkani",
                "Korean",
                "Kurdish",
                "Lombard",
                "Madurese",
                "Maithili",
                "Malagasy",
                "Malay",
                "Malayalam",
                "Mandarin",
                "Marathi",
                "Marwari",
                "Mossi",
                "Nepali",
                "Norther Min",
                "Norwegian",
                "Odia",
                "Oromo",
                "Other",
                "Pashto",
                "Persian",
                "Polish",
                "Portuguese",
                "Punjabi",
                "Quench",
                "Romanian",
                "Russian",
                "Sariki",
                "Serbo-Croatian",
                "Shona",
                "Sindhi",
                "Sinhalese",
                "Somali",
                "Southern Min",
                "Spanish",
                "Sudanese",
                "Swedish",
                "Sylheti",
                "Tagalog",
                "Tamil",
                "Telugu",
                "Thai",
                "Turkish",
                "Turkmen",
                "Ukrainian",
                "Urdu",
                "Uzbek",
                "Vietnamese",
                "WU",
                "Xhosa",
                "Xiang",
                "Yoruba",
                "Zhuang",
                "Zulu",
            ];

religion_list = [
        "Christian",
        "Muslim",
        "Jewish",
        "Sikh",
        "Hindu",
        "Parsi",
        "Jain",
        "Buddhist",
        "Other",
        "Non Religious",
        "Spiritual",
       ];

pets_list = [
        "Cat",
        "Dog",
        "Cat and Dog",
        "Bird",
        "Other",
        "No Pet",
];      

personality_list = [
        "Adventurer",
        "Animal Lover",
        "Artsy",
        "Athletic",
        "Adorable",
        "Beach Bum",
        "Bitchy",
        "Bird Lover",
        "BodyBuilder",
        "Blogger",
        "Blue Collar",
        "Bookworm",
        "Bossy",
        "Boy Crazy",
        "Brogrammer",
        "Cat person",
        "Casteist",
        "Chef",
        "Classy",
        "Class Clown",
        "Club Kid",
        "Coffee Snob",
        "Comic Nerd",
        "Crafty",
        "Crazy",
        "Daredevil",
        "Diva",
        "Dirt Bag",
        "Dog",
        "Dog Person",
        "Fashionista",
        "Feminist",
        "Film/TV Junkie",
        "Fighter",
        "Free Thinker",
        "Free Bird",
        "Free Will",
        "Foodie",
        "Geek",
        "Gamer",
        "Girl Crazy",
        "Gym Junkie",
        "Hedonist",
        "Hipster",
        "Hippie",
        "Homebody",
        "Homie",
        "Hopeless Romantic",
        "Humanist",
        "Humane",
        "Intellectual",
        "Intelligent",
        "Joker",
        "Jack Ass",
        "Kinky",
        "Maker",
        "Music Lover",
        "Music Hater",
        "Night Owl",
        "Nudist",
        "Nomad",
        "Pathetic",
        "Photographer",
        "Player",
        "Poet",
        "Prince",
        "Princess",
        "Professional",
        "Rockstar",
        "Rocky",
        "Ripped",
        "Successful Artist",
        "Starving artist",
        "Straight Edge",
        "Thinker",
        "Traveller",
        "Techie",
        "Treehugger",
        "Sapiophile",
        "Tattoo Lover",
        "TS Crazy",
        "Vegetarian",
        "Vegan",
        "Yogi",
        "Yuppy",
      ];


 children_list = [
        "Not Specified",
        "Have children",
        "Want children",
        "All my children are over 18 years",
        "Undecided",
        'Prefer not to say',
 ];   

 education_list = [
        "Bachelors",
        "Doctorate",
        "Masters",
        "Diploma",
        "Undergraduate",
        "Associate",
        "Honours",
        "Trade School",
        "Less than High School",
   ];

   profession_list = [
            "Not Specified",
            "Agriculturist",
            "Artist",
            "Attorney",
            "Admin",
            "Architect",
            "Aviation Professional",
            "Auto Professional",
            "Ad Professional",
            "Animal Professional",
            "Actor",
            "Business Owner",
            "Beauty Profession",
            "Consultant",
            "Corporate Professional",
            "Customer Relations",
            "Celebrity",
            "Fireman",
            "Government Official",
            "Construction",
            "Designer",
            "Engineer",
            "Entrepreneur",
            "Fashion Consultant",
            "Finance Professional",
            "Fitness Professional",
            "Healthcare Professional",
            "Hair Professional",
            "Hospitality Professional",
            "HR Professional",
            "Marketing Professional",
            "Musician",
            "Police",
            "Professor",
            "Physician",
            "Sales Professional",
            "Scientist - Researcher",
            "Software - IT Professional",
            "Student",
            "Sports Professional",
            "Tech Professional",
            "Other",
            "Unemployed",
   ];

  constructor(
              private MemberApi : MemberService,
              private router : Router,
              private ProfileApi:ProfileService,
            ) {
                this.male = true;
                this.female = true;
              }

  ngOnInit() {

  }
  onChange(value : any) {
    this.searchMinMax = value;

    console.log("onchange-range", this.searchMinMax);
}

onChange_male(value:any){
    console.log("male",value);
    if(value==true){
     this.male = true;
     this.female = false;
    }
    if(value==false){
        this.female = true;
        this.male = false;
       }
  
}
onChange_female(value:any){
    console.log("female",value);

    if(value==true){
        this.female = true;
        this.male = false;
       }
    if(value==false){
        this.female = false;
        this.male = true;
       }
      
}


saveProfile(){
     
  console.log("<<----------------");

  
  if (this.setupProfileForm.valid) {
            console.log("Form Submitted!");
            console.log("formdata",this.setupProfileForm.value);

            let form_data_collection = this.setupProfileForm.value;

            let searchInterested_gender = [];
            if(form_data_collection.searchInterestedIn_male==true){
             searchInterested_gender.push("Male");
            }
            if(form_data_collection.searchInterestedIn_female==true){
            searchInterested_gender.push("Female");
            }

            var user_gender;
            if(form_data_collection.male==true){
                user_gender = "Male";
            }
           else if(form_data_collection.female==true){
                 user_gender = "Female";
            }else{
                user_gender = "";
            }
           
            
          let  username1  = form_data_collection.username1;
          let  handleName  = form_data_collection.handleName;
          let  gender = user_gender;
          let  age  = form_data_collection.age;
          let  userAboutMe  = form_data_collection.userAboutMe;
          let  relationshipStatus = form_data_collection.relationshipStatus;
          let  religion = form_data_collection.religion;
          let  language = form_data_collection.language;
          let  pets = form_data_collection.pets;
          let  profession = form_data_collection.profession;
          let  personality=form_data_collection.personality;
          let  userInterests = form_data_collection.userInterests;
          let  children = form_data_collection.children;
          let  education = form_data_collection.education;
          let  searchIntent = [];
          let  searchMinMax = this.searchMinMax;
          let  searchDistance  = form_data_collection.searchDistance;
          let  searchInterestedIn = searchInterested_gender;

 
       let  form_submited_data = {
        username1:username1,
        handleName:handleName,
        gender:gender,
        age:age,
        userAboutMe:userAboutMe,
        relationshipStatus:relationshipStatus,
        religion:religion,
        language:language,
        pets:pets,
        profession:profession,
        personality:personality,
        userInterests:userInterests,
        children:children,
        education:education,
        searchIntent:[],
        searchMinMax:searchMinMax,
        searchDistance:searchDistance,
        searchInterestedIn:searchInterestedIn,
       };
       
      console.log("param_object",form_submited_data);  
      this.ProfileApi.createUserProfile(form_submited_data).subscribe(res => {
        console.log("User Profile created  Successfull ..",res);
        this.setupProfileForm.reset();
        let status1 = res['status'];
        if(status1==true){
        this.router.navigate(['swipe-cards']);
        }else{
       this.router.navigate(['setup-profile']);
        }
        
       });
        
  }
  




  console.log("---------------->>"); 
}



}
