import { Module } from '../../core/module.js';
import { getRandomColor } from '../../utils.js';
import './background.css';

export class BackgroundModule extends Module {
    #triggerCount = 0;
    #background = document.querySelector('.bg');

    constructor(type, text) {
        super(type, text);
    }

    trigger() {
        this.#triggerCount++;
        this.#makeSureBackgroundElementExists();

        if (this.#triggerCount < 3) {
            this.#applySolidBackground();
        } else if (this.#triggerCount < 7) {
            this.#applyWaveBackground();
        } else if (this.#triggerCount < 10) {
            this.#applyWaveBackground();
            this.#applyShakeEffect('STOP');
        } else if (this.#triggerCount === 10) {
            this.#applyWaveBackground();
            this.#applyFinalEffect();
        }
    }

    #makeSureBackgroundElementExists() {
        if (!this.#background) {
            this.#background = document.createElement('div');
            this.#background.className = 'bg';
            document.body.append(this.#background);
        }
    }

    #applySolidBackground() {
        this.#background.style.background = getRandomColor();
    }

    #applyWaveBackground() {
        let colors = [];
        for (let i = 0; i < this.#triggerCount -1; i++){
            colors.push(getRandomColor());
        } 
        
        this.#background.style.background = `linear-gradient(-45deg, ${colors.join(', ')})`;
        this.#background.style.backgroundSize = '300% 300%';
        this.#background.style.animation = 'wave 40s ease-in-out infinite';
    }

    #applyShakeEffect(text) {

        document.body.style.overflow = 'hidden';
        document.body.style.animation = 'bodyShrink 3s ease-in-out';
        
        const overlay = this.#createOverlay(text);
        document.body.appendChild(overlay);
        document.documentElement.classList.add('back-shine');
        document.body.classList.add('shake-active');
        
        setTimeout(() => this.#cleanupShakeEffect(overlay), 3000);
    }

    #createOverlay(text) {
        const overlay = document.createElement('div');
        overlay.className = 'stop-overlay';
        
        const stopText = document.createElement('div');
        stopText.className = 'stop-text';
        stopText.textContent = text;
        overlay.appendChild(stopText);
        
        return overlay;
    }

    #cleanupShakeEffect(overlay) {
        document.body.style.overflow = '';
        document.body.style.animation = '';
        document.body.classList.remove('shake-active');
        document.documentElement.classList.remove('back-shine');
        overlay.remove();
    }

    #applyFinalEffect() {
        this.#applyShakeEffect('IM DONE');
        setTimeout(() => {
            this.#triggerCount = 0;
            this.#background.style = null;
        }, 3000);
    }
}