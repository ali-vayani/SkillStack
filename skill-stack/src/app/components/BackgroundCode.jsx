export default function BackgroundCode() {
    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
            {`
import java.util.Random;

public class Longhorn {
    // Attributes of a Longhorn
    private String name;
    private int age;
    private String color;
    private boolean isProud;
    private int codingSkills; // Skill level on a scale from 1 to 10

    // Array of fun CS-related quotes, jokes, and UT references
    private String[] splashTexts = {
        "You can't fail classes you're not in, that's for sure.",
        "HackTX: Where coding meets creativity and snacks!",
        "Fine dining at Jester City Limits, where the Wi-Fi is strong and the food is stronger.",
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Keep calm and code on... or at least try to.",
        "The waitlist is a lie! Just like my last three all-nighters.",
        "Got a problem? Call in the CS major! They can fix anything... eventually.",
        "Sudo make me a sandwich? No thanks, I’ll code it!",
        "Remember, at UT: not all heroes wear capes; some just carry laptops."
    };

    // Constructor
    public Longhorn(String name, int age, String color, int codingSkills) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.isProud = true; // Longhorns are always proud!
        this.codingSkills = codingSkills;
    } 

    // Method to simulate coding
    public void code() {
        System.out.println(name + " is coding like a Longhorn! 💻");
        // Random splash text for fun
        System.out.println(getRandomSplashText());
    }

    // Method to get a random splash text
    private String getRandomSplashText() {
        Random random = new Random();
        return splashTexts[random.nextInt(splashTexts.length)];
    }

    // Method to show pride in being a Longhorn
    public void showPride() {
        if (isProud) {
            System.out.println(name + " says: 'Hook 'em! 🤘'");
        }
    }

    // Method to upgrade coding skills
    public void practiceCoding() {
        if (codingSkills < 10) {
            codingSkills++;
            System.out.println(name + "'s coding skills have improved to level " + codingSkills + "!");
        } else {
            System.out.println(name + " has maxed out their coding skills at level 10! 🦸‍♂️");
        }
    }

    // Main method to run the Longhorn class
        public static void main(String[] args) {
            Longhorn longhorn = new Longhorn("Bevo", 8, "Burnt Orange", 11);
            longhorn.code();            // Simulate coding
            longhorn.showPride();      // Show pride
            longhorn.practiceCoding();  // Practice coding
            longhorn.practiceCoding();  // Practice coding again
        }
}
`}
        </div>
    );
}
