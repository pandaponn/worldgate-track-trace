resource "aws_default_vpc" "default_vpc" {
    enable_dns_support   = true
    enable_dns_hostnames = true
}

resource "aws_default_subnet" "default_subnet_a" {
    availability_zone = "ap-southeast-1a"
}

resource "aws_default_subnet" "default_subnet_b" {
    availability_zone = "ap-southeast-1b"
}

resource "aws_default_subnet" "default_subnet_c" {
    availability_zone = "ap-southeast-1c"
}

resource "aws_security_group" "load_balancer_sec_group_default" {
    name        = "load_balancer_security_group"
    description = "Only our IPs"

    ingress {
        from_port   = 0 # Allowing any incoming port
        to_port     = 0 # Allowing any outgoing port
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"] # Allowing traffic in from all sources
    }

    egress {
        from_port   = 0 # Allowing any incoming port
        to_port     = 0 # Allowing any outgoing port
        protocol    = "-1" # Allowing any outgoing protocol 
        cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
    }
}


#Externally facing load balancer

resource "aws_alb" "application_load_balancer" {
    name               = "default-subnet-lb" # Naming our load balancer
    load_balancer_type = "application"
    subnets = [ # Referencing the default subnets
        "${aws_default_subnet.default_subnet_a.id}",
        "${aws_default_subnet.default_subnet_b.id}",
        "${aws_default_subnet.default_subnet_c.id}"
    ]
security_groups = ["${aws_security_group.load_balancer_default_security_group.id}"]
}

# Security group for external load balancer
resource "aws_security_group" "load_balancer_default_security_group" {
    ingress {
        from_port   = 0 # Allowing traffic in from port 80
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"] # Allowing traffic in from all sources
    }

    egress {
        from_port   = 0 # Allowing any incoming port
        to_port     = 0 # Allowing any outgoing port
        protocol    = "-1" # Allowing any outgoing protocol 
        cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
    }
}

# frontend 
resource "aws_lb_target_group" "target_group_fe_default_subnet" {
    name        = "target-group"
    port        = 80
    protocol    = "HTTP"
    target_type = "ip"
    vpc_id      = "${aws_default_vpc.default_vpc.id}" # Referencing the default VPC
    health_check {
        matcher = "200,301,302"
        path = "/"
    }
}

resource "aws_lb_listener" "listener_fe_default_subnet" {
    load_balancer_arn = "${aws_alb.application_load_balancer.arn}" # Referencing our load balancer
    port              = "80"
    protocol          = "HTTP"
    default_action {
        type             = "forward"
        target_group_arn = "${aws_lb_target_group.target_group_fe_default_subnet.arn}" # Referencing our tagrte group
    }
}

resource "aws_route53_zone" "worldgatetracktrace" {
  name = "worldgatetracktrace.live"
}

resource "aws_route53_record" "worldgatetracktrace" {
  zone_id = aws_route53_zone.worldgatetracktrace.zone_id
  name    = "worldgatetracktrace.live"
  type    = "A"

  alias {
    name                   = aws_alb.application_load_balancer.dns_name
    zone_id                = aws_alb.application_load_balancer.zone_id
    evaluate_target_health = true
  }
}