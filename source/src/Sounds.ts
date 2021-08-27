export class Sounds {
    public current_sound : HTMLAudioElement;
    public currentstate : boolean = false;
    constructor(volume : number){
        this.current_sound=new Audio('./sounds/alarm.mp3'); // Трек по умолчанию (нужен для уровня громкости)
        this.current_sound.volume=volume;

    }
    public changestatus(track : String,volume = 1){ // Вспомогательное для чекбокса
        console.log(this.currentstate)
        if (this.currentstate == false){
            this.currentstate = true;
            this.playcontinuously(track,volume)
        } else {
            this.currentstate = false;
            this.stop()
        }
    }
    public stop(){ // Остановить воспроизведение трека
        this.current_sound.pause();
    }
    public  playcontinuously(track : String,volume = 1) { // Воспроизведение циклично(до остановки)
            this.current_sound=new Audio('./sounds/'+track+'.mp3');
            this.current_sound.volume=volume;
            this.current_sound.play();
            this.current_sound.addEventListener("ended", function() {
                this.play();
            })
    }
    public  play(track : String,volume = 1) { // Воспроизведение (до окончания трека)
        this.current_sound=new Audio('./sounds/'+track+'.mp3');
        this.current_sound.volume=volume;
        this.current_sound.play();
    }
}
  