package com.example.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.persistence.Id;
import java.util.Date;
@Entity
@Table(name="server_information", schema="PUBLIC")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "server_id")
    private Long id;
    @Column(name = "name_of_server")
    private String name;
    @Column(name = "add_date")
    private Date creationDate;
    @Column(name = "server_type_id")
    private ServerType type;
    @Column(name = "status_id")
    private ServerStatus status;
    private Date lastWorkDate;
    private String description;
    private String serverAddress;
    private String serverComment;
    private int pollingInterval;
    private Date updateDate;
    private String additionalIndicators;

    public void setType(int type)
    {
        this.type = ServerType.values()[type];
    }
    public void setStatus(int status)
    {
        this.status = ServerStatus.values()[status];
    }

    public String getType()
    {
        return (ServerType.values()[this.type.ordinal()]).toString();
    }
    public String getStatus()
    {
        return (ServerStatus.values()[this.type.ordinal()]).toString();
    }
    public ServerStatus getStatusEnum()
    {
        return this.status;
    }
    public ServerType getTypeEnum()
    {
        return this.type;
    }

}



