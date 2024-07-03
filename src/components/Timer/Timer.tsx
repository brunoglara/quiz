import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./Timer.module.css"

interface TimerProps {
    key: number
	duration: number;
	onTimerEnd: () => void;
}

export default function Timer(props: TimerProps) {
	return (
        <div className={styles.timer}>
            <CountdownCircleTimer 
                size={120}
                isPlaying
                duration={props.duration}
                onComplete={props.onTimerEnd}
                colors={
                    [
                        "#28A745",
                        "#FFC107",
                        "#DC3545",

                    ]}
                    colorsTime={[
                        props.duration * 1, // 10% do duration
                        props.duration * 0.6, // 6% do duration
                        0 // 0% do duration
                    ]}
            > 
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    );
}
