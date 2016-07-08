/**
 * Created by Anastasios Selalmazidis <t.selalmasidis@gmail.com> on 7/7/2016.
 */
function container_ports(Ports) {
    ret_str = [];

    // Altenate method
    /*
     for (index in Ports) {
     var str = "[ ";
     for (var key in Ports[index]) {
     str += key + ": " + Ports[index][key] + ", ";
     }
     str += " ]";
     ret_str.push(str);
     }
     */

    for (index in Ports) {
        var str = "[ ";
        if (Ports[index].hasOwnProperty("IP")) {
            str += "IP: " + Ports[index].IP + ", ";
        }
        if (Ports[index].hasOwnProperty("PrivatePort")) {
            str += "PrivatePort: " + Ports[index].PrivatePort + ", ";
        }
        if (Ports[index].hasOwnProperty("PublicPort")) {
            str += "PublicPort: " + Ports[index].PublicPort + ", ";
        }
        if (Ports[index].hasOwnProperty("Type")) {
            str += "Type: " + Ports[index].Type;
        }
        str += " ]";
        ret_str.push(str);
    }

    return ret_str;
}
