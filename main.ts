let timeStart = 0
let boolBegin = false
let debut2 = 0
let debut = 0
// Permet de géré les moteur plus facilement entre -255 et 255
function Motors(Mx1: number, Mx2: number) {
    // géré le dépassement de la vitesse physique maximale
    if (-255 < Mx1 && Mx1 < 255 && (-255 < Mx2 && Mx2 < 255)) {
        if (Mx1 > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Mx1)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, -Mx1)
        }
        
        if (Mx2 > 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, Mx2)
        } else {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, -Mx2)
        }
        
    } else {
        if (Mx1 > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, -255)
        }
        
        if (Mx2 > 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
        } else {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, -255)
        }
        
    }
    
}

basic.forever(function on_forever() {
    let elapsedTime: number;
    
    debut2 = pins.digitalReadPin(DigitalPin.P0)
    if (input.buttonIsPressed(Button.A) || debut2 != 0 && !boolBegin) {
        timeStart = control.millis()
        boolBegin = true
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            `)
    }
    
    if (boolBegin) {
        elapsedTime = control.millis() - timeStart
        if (10000 <= elapsedTime && elapsedTime <= 20000) {
            if (maqueen.Ultrasonic() >= 5) {
                //  Continue à avancer si pas d'obstacle
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 200)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 200)
            } else {
                //  Arrête le robot s'il y a un obstacle
                maqueen.motorStop(maqueen.Motors.All)
            }
            
        } else if (20000 > elapsedTime && elapsedTime > 30000) {
            //  Arrêt définitif après 100 secondes
            maqueen.motorStop(maqueen.Motors.All)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 200)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            basic.showLeds(`
                . . . . .
                . . . . .
                . # # # .
                . . . . .
                . . . . .
                `)
        }
        
    }
    
})
