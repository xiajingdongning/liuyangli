import java.io.File;
public interface setSoundTrack02 {
	music m = new music((new File("Rembrandt.wav")));
	default music set() {
		return m;
	}

}
