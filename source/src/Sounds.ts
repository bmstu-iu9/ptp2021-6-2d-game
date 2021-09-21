export class Sounds {
    public current_sound: HTMLAudioElement;
    public currentstate: boolean = false;
    private time: Number;

    constructor(volume: number) {
        this.current_sound = new Audio('./sounds/muted.mp3'); // Трек по умолчанию (нужен для уровня громкости)
        this.current_sound.volume = volume;
        this.time = 0;
    }

    public stop() { // Остановить воспроизведение трека
        this.current_sound.pause();
    }

    public playcontinuously(track: String, volume = 1) { // Воспроизведение циклично(до остановки)
        this.current_sound = new Audio('./sounds/' + track + '.mp3');
        this.current_sound.volume = volume;
        this.current_sound.play();
        this.current_sound.addEventListener("ended", function () {
            this.play();
        });
    }

    public play(track: String, volume = 1) { // Воспроизведение (до окончания трека)
        if (this.time == this.current_sound.currentTime)
            this.current_sound = new Audio('./sounds/' + track + '.mp3');
        this.current_sound.volume = volume;
        this.current_sound.play();
        this.time = this.current_sound.currentTime;
    }

    public playimposition(track: String, volume = 1) { // Воспроизведение (до окончания трека)
        this.current_sound = new Audio('./sounds/' + track + '.mp3');
        this.current_sound.volume = volume;
        this.current_sound.play();
    }
}
