import { mergeArray } from "./AuxLib";
import { Debug } from "./Debug";
import { Color } from "./Draw";
import { eps, Vector, vectorComparison } from "./Geom";
import { Mimic } from "./Mimic";

export class Ray {
    private static isBetween(begin, middle, end) {
        return ((begin + eps > middle && middle + eps > end) ||
            (begin - eps < middle && middle - eps < end));
    }

    public static pointGenerator(begin: Vector, end: Vector) {
        let angle = end.sub(begin).angle();
        let stepVec = new Vector(Math.cos(angle), Math.sin(angle));

        let xPoints: Vector[] = [];
        xPoints[0] = begin.clone();
        if (!this.isBetween(-eps, stepVec.x, eps)) {
            if (stepVec.x < 0) {
                xPoints[1] = new Vector(Math.floor(begin.x), 0);
                xPoints[1] = begin.add(stepVec.mul((xPoints[1].x - begin.x) / stepVec.x));
            } else {
                xPoints[1] = new Vector(Math.ceil(begin.x), 0);
                xPoints[1] = begin.add(stepVec.mul((xPoints[1].x - begin.x) / stepVec.x));
            }
        } else {
            xPoints[1] = end.clone();
        }

        let yPoints: Vector[] = [];
        yPoints[0] = begin.clone();
        if (!this.isBetween(-eps, stepVec.y, eps)) {
            if (stepVec.y < 0) {
                yPoints[1] = new Vector(0, Math.floor(begin.y));
                yPoints[1] = begin.add(stepVec.mul((yPoints[1].y - begin.y) / stepVec.y));
            } else {
                yPoints[1] = new Vector(0, Math.ceil(begin.y));
                yPoints[1] = begin.add(stepVec.mul((yPoints[1].y - begin.y) / stepVec.y));
            }
        } else {
            yPoints[1] = end.clone();
        }

        console.log(xPoints, yPoints);

        for (let i = 1; this.isBetween(begin.x, xPoints[i].x, end.x); i++) {
            if (this.isBetween(-eps, stepVec.x, eps)) {
                break;
            }
            if (stepVec.x < 0) {
                xPoints[i + 1] = xPoints[i].add(new Vector(-1, 0));
                xPoints[i + 1] = begin.add(stepVec.mul((xPoints[i + 1].x - begin.x) / stepVec.x));
            } else {
                xPoints[i + 1] = xPoints[i].add(new Vector(1, 0));
                xPoints[i + 1] = begin.add(stepVec.mul((xPoints[i + 1].x - begin.x) / stepVec.x));
            }
        }
        xPoints[xPoints.length - 1] = end.clone();

        for (let i = 1; this.isBetween(begin.y, yPoints[i].y, end.y); i++) {
            if (this.isBetween(-eps, stepVec.y, eps)) {
                continue;
            }
            if (stepVec.y < 0) {
                yPoints[i + 1] = yPoints[i].add(new Vector(0, -1));
                yPoints[i + 1] = begin.add(stepVec.mul((yPoints[i + 1].y - begin.y) / stepVec.y));
            } else {
                yPoints[i + 1] = yPoints[i].add(new Vector(0, 1));
                yPoints[i + 1] = begin.add(stepVec.mul((yPoints[i + 1].y - begin.y) / stepVec.y));
            }
        }
        yPoints[yPoints.length - 1] = end.clone();
        let points = mergeArray(xPoints, yPoints, vectorComparison);
        console.log(points);
        let midPoints = [];
        for (let i = 1; i < points.length; i++) {
            midPoints[midPoints.length] = (points[i - 1].add(points[i])).mul(1/2); 
        }
        for (let i = 0; i < midPoints.length; i++) {
            Debug.addPoint(midPoints[i], new Color(256, 0, 0));
        }
    }

    public wallIntersection() {

    }
}