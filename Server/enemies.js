import { Game } from "./server.js";

class obstacle{
    constructor(height, width, renderer, target) {
        this.enemies = ["sean", "player"]
        this.renderer = renderer
        this.height = height;
        this.width = width;
        this.target = target
        this.x = this.generateX();
        this.sidedirection = 0
        this.updirection = 0
        this.y = this.generateY();
        this.priority = 0
        this.fillStyle = "rgb(255,0,255)"
        this.speed = .4
        this.shape = "rectangle"
        this.damagetime = 60
        this.health = 50
        this.damage = 50
        this.damagetimer = this.damagetime
        let type = Math.random() * 100
        if (95 >= type && type > 70){
            this.fillStyle = "rgb(255, 158, 61)"
            this.speed *= 2
            this.killvalue = 3
        }
        if (type > 95) {
            this.fillStyle = "rgb(0,255,0)"
            this.speed *= 2
            this.health *= 3
            this.killvalue = 5
        }
        renderer.addObject(this)
    }
    generateX() {
        let X = Math.floor(Math.random() * Game.width)
        while ((this.target.x - 10 < X && X < this.target.x + 10)) {
            X = Math.floor(Math.random() * Game.width);
        }
        return X
    }
    generateY() {
        let Y = Math.floor(Math.random() * Game.height)
        while ((this.target.y - 10 < Y && Y < this.target.y + 10)) {
            Y = Math.floor(Math.random() * Game.height);
        }
        return Y
    }
    update(self) {
        if (this.health <= 0) {
            self.renderer.removeObject(self.renderer,self)
            new Obstacle(10, 10, self.renderer, self.lastenemy ? self.lastenemy : self.target)
        }
        if (self.target == null) {
            return;
        }
        if (self.target.x > self.x){
            self.sidedirection = 1
        }
        if (self.target.x < self.x) {
            self.sidedirection = -1
        }
        if (self.target.x == self.x) {
            self.sidedirection = 0
        }
        if (self.target.y > self.y) {
            self.updirection = 1
        }
        if (self.target.y < self.y) {
            self.updirection = -1
        }
        if (self.target.y == self.y) {
            self.updirection = 0
        }
        self.x += self.sidedirection * self.speed
        self.y += self.updirection * self.speed
        this.damagetimer -= 1
    }
    collision (self,object){
        if (object.constructor.name == "player") {
            self.target = object
        }
        if (self.enemies.indexOf(object.constructor.name) != -1 && self.damagetimer < 0 ) {
            object.health -= self.damage
            self.damagetimer = self.damagetime
        }
    }
}
class guardobstacle{
    constructor(height, width, renderer, x, y, movedistance, axis) {
        this.enemies = ["sean", "player"]
        this.renderer = renderer
        this.height = height;
        this.width = width;

        this.x = x;
        this.y = y;

        this.priority = 0
        this.fillStyle = "rgb(255,0,0)"
        this.speed = .4
        this.shape = "rectangle"

        this.health = 50

        this.damage = 50
        this.damagetime = 60
        this.damagetimer = this.damagetime

        this.startx = x
        this.starty = y
        this.movedistance = movedistance
        this.movedirection = 1
        if (movedistance < 0) {
            this.movedirection = -1
        }
        this.axis = axis
        renderer.addObject(this)
    }7
    update(self) {
        const dir = self.movedistance < 0 ? -1 : 1
        if (self.health <= 0) {
            self.renderer.removeObject(self.renderer,self)
            new GuardObstacle(10, 10, self.renderer, self.lastenemy ? self.lastenemy : self.target)
        }

        let axispos = self.axis == 'x' ? self.x : self.y
        let startpos = self.axis == 'x' ? self.startx : self.starty

        if ( ( dir * (startpos + self.movedistance) <= axispos * dir) || ( dir * axispos < startpos * dir) ) {
            self.movedirection *= -1
        }

        self.axis == 'x' ? self.x += 1 * self.movedirection : self.y += 1 * self.movedirection

        self.damagetimer -= 1
    }
    collision (self,object){
        if (self.enemies.indexOf(object.constructor.name) != -1 && self.damagetimer < 0 ) {
            object.health -= self.damage
            self.damagetimer = self.damagetime
        }
    }
}
export const Obstacle = obstacle
export const GuardObstacle = guardobstacle