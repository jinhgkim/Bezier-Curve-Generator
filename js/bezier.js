/**
 * Bezier is a class that creates a bezier curve on canvas
 * Your code needs to go into a bunch of spaces here 
 */

class Bezier {

    constructor() {
        this.control_points = [];
        this.curve_mode = "Baseline";
        this.continuity_mode = "C0";
        this.subdivide_level = 0;
        this.piecewise_degree = 1;
        this.samples = 20;
    }

    /** ---------------------------------------------------------------------
     * Evaluate the Bezier curve at the given t parameter
     * @param t Given t parameter
     * @return Vec2 The location of point at given t parameter
     */
    eval_curve(t) {
        if (t >= 0.0 && t <= 1.000005) {
            if (this.control_points.length > 1) {

                // You may find the following functions useful"
                //  - this.nCK(m, i) computes "m choose i", aka: (m over i)
                //  - Math.pow(t, i) computes t raised to the power i

                //@@@@@
                // YOUR CODE HERE
                //@@@@@
            }
        }
    };

    /** ---------------------------------------------------------------------
     * Subdivide this Bezier curve into two curves
     * @param curve1 The first curve
     * @param curve2 The second curve
     */
    subdivide_curve(curve1, curve2) {

        //@@@@@
        // YOUR CODE HERE
        //@@@@@
    };


    /** ---------------------------------------------------------------------
     * Draw this Bezier curve
     */
    draw_curve() {
        if (this.control_points.length >= 2) {

            if (this.curve_mode == "Baseline") {
                // Baseline Mode
                //
                // Create a Bezier curve from the entire set of control points,
                // and then simply draw it to the screen

                // Do this by evaluating the curve at some finite number of t-values,
                // and drawing line segments between those points.
                // You may use the this.drawLine() function to do the actual
                // drawing of line segments.

                //@@@@@
                // YOUR CODE HERE
                //@@@@@
            }
            else if (this.curve_mode == "DeCasteljau") {
                // DeCasteljau mode
                //
                // Create a Bezier curve from the entire set of points,
                // then subdivide it the number of times indicated by the
                // this.subdivide_level variable.
                // The control polygons of the subdivided curves will converge
                // to the actual bezier curve, so we only need to draw their
                // control polygons.

                //@@@@@
                // YOUR CODE HERE
                //@@@@@
            }
            else if (this.curve_mode == "Spline") {
                if (this.continuity_mode == "C0")
                {
                    // C0 continuity
                    //
                    // Each piecewise curve should be C0 continuous with adjacent
                    // curves, meaning they should share an endpoint.

                    //@@@@@
                    // YOUR CODE HERE
                    //@@@@@
                }
                else if (this.continuity_mode == "C1")
                {
                    // C1 continuity
                    //
                    // Each piecewise curve should be C1 continuous with adjacent
                    // curves.  This means that not only must they share an endpoint,
                    // they must also have the same tangent at that endpoint.
                    // You will likely need to add additional control points to your
                    // Bezier curves in order to enforce the C1 property.
                    // These additional control points do not need to show up onscreen.

                    //@@@@@
                    // YOUR CODE HERE
                    //@@@@@
                }
            }
        }
    };


    /** ---------------------------------------------------------------------
     * Draw line segment between point p1 and p2
     */
    draw_line(p1, p2) {
        this.gl_operation.draw_line(p1, p2);
    };


    /** ---------------------------------------------------------------------
     * Draw control polygon
     */
    draw_control_polygon() {
        if (this.control_points.length >= 2) {
            for (var i = 0; i < this.control_points.length - 1; i++) {
                this.draw_line(this.control_points[i], this.control_points[i + 1]);
            }
        }
    };

    /** ---------------------------------------------------------------------
     * Draw control points
     */
    draw_control_points() {
        this.gl_operation.draw_points(this.control_points);
    };


    /** ---------------------------------------------------------------------
     * Drawing setup
     */
    draw_setup() {
        this.gl_operation.draw_setup();
    };


    /** ---------------------------------------------------------------------
     * Compute nCk ("n choose k")
     * WARNING:: Vulnerable to overflow when n is very large!
     */
    nCK(n, k) {
        var result = -1;

        if (k >= 0 && n >= k) {
            result = 1;
            for (var i = 1; i <= k; i++) {
                result *= n - (k - i);
                result /= i;
            }
        }

        return result;
    };


    /** ---------------------------------------------------------------------
     * Setters
     */
    set_GL(gl_operation) {
        this.gl_operation = gl_operation;
    };

    set_curve_mode(curveMode) {
        this.curve_mode = curveMode;
    };

    set_continuity_mode(continuityMode) {
        this.continuity_mode = continuityMode;
    };

    set_subdivision_level(subdivisionLevel) {
        this.subdivide_level = subdivisionLevel;
    };

    set_piecewise_degree(piecewiseDegree) {
        this.piecewise_degree = piecewiseDegree;
    };

    set_samples(samples) {
        this.samples = samples;
    };

    /** ---------------------------------------------------------------------
     * Getters
     */
    get_curve_mode() {
        return this.curve_mode;
    };

    get_continuity_mode() {
        return this.continuity_mode;
    };

    get_subdivision_level() {
        return this.subdivide_level;
    };

    get_piecewise_degree() {
        return this.piecewise_degree;
    };

    /** ---------------------------------------------------------------------
     * @return Array A list of control points
     */
    get_control_points() {
        return this.control_points;
    };


    /** ---------------------------------------------------------------------
     * @return Vec2 chosen point
     */
    get_control_point(idx) {
        return this.control_points[idx];
    };

    /** ---------------------------------------------------------------------
     * Add a new control point
     * @param new_point Vec2 A 2D vector that is added to control points
     */
    add_control_point(new_point) {
        this.control_points.push(new_point);
    };

    /** ---------------------------------------------------------------------
     * Remove a control point
     * @param point Vec2 A 2D vector that is needed to be removed from control points
     */
    remove_control_point(point) {
        var pos =  this.points.indexOf(point);
        this.control_points.splice(pos, 1);
    };

    /** ---------------------------------------------------------------------
     * Remove all control points
     */
    clear_control_points() {
        this.control_points = [];
    };

    /** ---------------------------------------------------------------------
     * Print all control points
     */
    print_control_points() {
        this.control_points.forEach(element => {
            element.print_vector();
        });
    };
}
